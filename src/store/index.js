import { createStore } from 'vuex';
import {
  saveAccessTokenToCookie,
  saveUserToCookie,
  saveRefreshTokenToCookie,
  getAccessTokenFromCookie,
  getUserFromCookie,
  getRefreshTokenFromCookie,
  deleteCookie,
} from '@/utils/cookies';
import { loginUser, logoutUser } from '@/api/index';

export default createStore({
  state: {
    email: getUserFromCookie() || '',
    accessToken: getAccessTokenFromCookie() || '',
    refreshToken: getRefreshTokenFromCookie() || '',
    errorMessage: '',
  },
  getters: {
    isLogin(state) {
      return state.email !== '';
    },

    email(state) {
      return state.email;
    },
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    clearEmail(state) {
      state.email = '';
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    },
    clearAccessToken(state) {
      state.accessToken = '';
    },
    clearRefreshToken(state) {
      state.refreshToken = '';
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage; // 에러 메시지 설정
    },
  },
  actions: {
    async login({ commit }, userData) {
      try {
        const response = await loginUser(userData);
        const { data } = response;
        commit('setEmail', userData.email);
        commit('setAccessToken', data.accessToken);
        commit('setRefreshToken', data.refreshToken);
        saveAccessTokenToCookie(data.accessToken);
        saveRefreshTokenToCookie(data.refreshToken);
        saveUserToCookie(userData.email);
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async logout({ state, commit }) {
      try {
        const logoutData = {
          email: state.email,
          accessToken: state.accessToken,
        };
        console.log('Logout data:', logoutData); // 로그아웃 데이터 출력
        await logoutUser(logoutData);
        commit('clearEmail');
        commit('clearAccessToken');
        commit('clearRefreshToken');
        deleteCookie('til_auth');
        deleteCookie('til_user');
        deleteCookie('til_refresh');
        deleteCookie('JSESSIONID', '/'); // JSESSIONID 쿠키 삭제
      } catch (error) {
        console.error('Failed to logout', error);
      }
    },
  },
});
