import store from '@/store/index'; // 스토어 모듈을 가져옵니다.

export function setInterceptors(instance) {
  // 요청 인터셉터를 추가합니다.
  instance.interceptors.request.use(
    function (config) {
      // 요청을 보내기 전에 수행할 작업입니다.
      // console.log(config); // 요청(config)을 로깅합니다.
      config.headers.Authorization = store.state.token; // 요청 헤더에 토큰을 추가합니다.
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
      // 응답 데이터 처리를 위한 작업을 수행합니다.
      return response; // 응답을 반환합니다.
    },
    function (error) {
      // 2xx 범위 외의 모든 상태 코드에 대해 이 함수가 실행됩니다.
      // 응답 에러 처리를 위한 작업을 수행합니다.
      return Promise.reject(error); // 에러를 반환합니다.
    },
  );
  return instance; // 인터셉터가 적용된 인스턴스를 반환합니다.
}
