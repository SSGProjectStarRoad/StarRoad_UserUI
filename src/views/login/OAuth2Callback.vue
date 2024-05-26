<template>
  <div>Logging in...</div>
</template>

<script>
import { loginWithOAuth2 } from '@/api/index';
import {
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
  saveUserToCookie,
} from '@/utils/cookies';

export default {
  async created() {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    const provider = this.$route.path.includes('google')
      ? 'google'
      : this.$route.path.includes('kakao')
      ? 'kakao'
      : this.$route.path.includes('naver')
      ? 'naver'
      : '';

    if (code) {
      try {
        const response = await loginWithOAuth2(provider, code);
        console.log('OAuth2 login successful:', response.data);

        const { accessToken, refreshToken, email } = response.data;

        this.$store.commit('setEmail', email);
        this.$store.commit('setAccessToken', accessToken);
        this.$store.commit('setRefreshToken', refreshToken);
        saveAccessTokenToCookie(accessToken);
        saveRefreshTokenToCookie(refreshToken);
        saveUserToCookie(email);

        this.$router.push('/main');
      } catch (error) {
        console.error('OAuth2 login failed:', error);
      }
    }
  },
};
</script>
