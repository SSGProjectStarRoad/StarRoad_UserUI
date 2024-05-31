import axios from 'axios';
import store from '@/store/index';
import {
  saveAccessTokenToCookie,
  getRefreshTokenFromCookie,
} from '@/utils/cookies';

export function setInterceptors(instance) {
  // 요청 인터셉터를 추가합니다.
  instance.interceptors.request.use(
    function (config) {
      const token = store.state.accessToken; // Vuex 스토어에서 액세스 토큰을 가져옵니다.
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // 요청 헤더에 토큰을 추가합니다.
      }
      return config; // 수정된 요청(config)을 반환합니다.
    },
    function (error) {
      // 요청 에러 발생 시 수행할 작업입니다.
      return Promise.reject(error); // 에러를 반환합니다.
    },
  );

  // 응답 인터셉터를 추가합니다.
  instance.interceptors.response.use(
    function (response) {
      // 2xx 범위 내의 모든 상태 코드에 대해 이 함수가 실행됩니다.
      return response; // 응답을 반환합니다.
    },
    async function (error) {
      const {
        config,
        response: { status },
      } = error;
      const originalRequest = config;
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        store.commit('setErrorMessage', error.response.data.message);
      }
      if (status === 401 && !error.response.data.message) {
        // 액세스 토큰이 만료된 경우 새로운 액세스 토큰을 발급받습니다.
        try {
          const refreshToken = getRefreshTokenFromCookie(); // 쿠키에서 리프레시 토큰을 가져옵니다.
          const { data } = await axios.post(
            `${process.env.VUE_APP_API_URL}/api/token/access-token`,
            { refreshToken },
          );
          store.commit('setAccessToken', data.accessToken); // 새로운 액세스 토큰을 Vuex 스토어에 저장합니다.
          saveAccessTokenToCookie(data.accessToken); // 새로운 액세스 토큰을 쿠키에 저장합니다.
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`; // 요청 헤더를 갱신된 토큰으로 수정합니다.
          return axios(originalRequest); // 원래의 요청을 재시도합니다.
        } catch (e) {
          store.dispatch('logout'); // 리프레시 토큰 갱신 실패 시 로그아웃 처리합니다.
        }
      }
      return Promise.reject(error); // 에러를 반환합니다.
    },
  );
  return instance; // 인터셉터가 적용된 인스턴스를 반환합니다.
}
