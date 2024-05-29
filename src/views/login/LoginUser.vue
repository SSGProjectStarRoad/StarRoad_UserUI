<template>
  <div class="contents">
    <div></div>

    <div class="loginform">
      <form @submit.prevent="submitForm">
        <div class="welcome-message">
          <img class="login-logo" :src="loginlogo" alt="" />
          <h2>Welcome to Star Road!</h2>
        </div>

        <div class="email-input">
          <input
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            v-model="email"
          />
          <p class="validation-text">
            <span class="warning" v-if="!isEmailValid && email">
              이메일 주소를 입력해주세요
            </span>
          </p>
        </div>

        <div class="password-input">
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            v-model="password"
          />
        </div>

        <div class="forgot-password" @click="gotoForgotPassword">
          Forgot Password?
        </div>

        <div class="login-input">
          <button
            id="loginclear"
            :disabled="!isEmailValid || !password"
            type="submit"
          >
            로그인
          </button>
        </div>

        <div class="sns-login">Or Login with</div>
        <div class="snsimg">
          <div class="sns" @click="loginWith('kakao')">
            <img class="kakao" :src="kakao" />
          </div>
          <div class="sns" @click="loginWith('google')">
            <img class="google" :src="google" />
          </div>
          <div class="sns" @click="loginWith('naver')">
            <img class="naver" :src="naver" />
          </div>
        </div>
      </form>
      <div v-if="notification" ref="notification" class="notification">
        {{ notification }}
      </div>
    </div>
    <div class="registerback">
      계정이 없으신가요?
      <div class="register" @click="gotoRegister">회원가입</div>
    </div>
  </div>
</template>

<script>
import loginlogo from '@/img/telescope_big.png';
import kakao from '@/img/login/kakaologo.png';
import google from '@/img/login/googlelogo.png';
import naver from '@/img/login/naverlogo.png';
import { validateEmail } from '@/utils/validation';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      loginlogo: loginlogo,
      kakao: kakao,
      google: google,
      naver: naver,
      email: '',
      password: '',
      logMessage: '',
      notification: '',
    };
  },
  computed: {
    ...mapState(['errorMessage']),
    isEmailValid() {
      return validateEmail(this.email);
    },
  },
  watch: {
    errorMessage(newMessage) {
      if (newMessage) {
        this.showNotification(newMessage);
      }
    },
  },
  methods: {
    ...mapMutations(['setErrorMessage']),
    async submitForm() {
      try {
        const userData = {
          email: this.email,
          password: this.password,
        };
        const response = await this.$store.dispatch('login', userData);
        if (
          response.data &&
          response.data.accessToken &&
          response.data.refreshToken
        ) {
          this.$router.push('/main');
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('Login error:', error);
        // 에러 처리는 Vuex store에서 하므로 여기서는 추가 작업 필요 없음
      } finally {
        this.initForm();
      }
    },
    showNotification(message) {
      this.notification = message;
      this.$nextTick(() => {
        const notificationElement = this.$refs.notification;
        notificationElement.classList.add('fade-in');
        setTimeout(() => {
          notificationElement.classList.remove('fade-in');
          notificationElement.classList.add('fade-out');
          setTimeout(() => {
            this.notification = '';
            this.setErrorMessage(''); // Vuex의 errorMessage 상태도 초기화
          }, 500);
        }, 1500);
      });
    },
    initForm() {
      this.email = '';
      this.password = '';
    },
    gotoRegister() {
      this.$router.push('/login/register');
    },
    gotoForgotPassword() {
      this.$router.push('/login/forgotpw');
    },
    loginWith(provider) {
      const combineURLs = (baseURL, relativeURL) => {
        return (
          baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        );
      };
      const baseUrl = process.env.VUE_APP_API_URL;
      const url = combineURLs(baseUrl, `/oauth2/authorization/${provider}`);
      window.location.href = url;
    },
  },
};
</script>

<style scoped>
.contents {
  display: flex; /* Flexbox 레이아웃 사용 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  align-items: center; /* 수평 방향 중앙 정렬 */
  /* height: 100vh; 뷰포트 높이를 전체 크기로 설정 */
  padding-top: 60px;
  padding-bottom: 0px;
}
.login-logo {
  width: 130px; /* 로고의 크기를 조정합니다. */
  height: auto; /* 높이는 자동으로 조정되도록 설정합니다. */
}

.welcome-message {
  text-align: center;
  margin-bottom: 15px; /* 텍스트와 로그인 폼 사이의 간격을 조정합니다. */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.loginform {
  text-align: center;
  position: relative;
  width: 350px;
  margin: 0 auto;
}
.email-input,
.password-input,
.login-input {
  position: relative;
  margin-bottom: 10px;
}
/* .password-input {
  margin-top: 25px;
} */
#email,
#password {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--gray-color);
  border: 0;
  padding-left: 10px;
}
#email:focus,
#password:focus {
  border: 2px solid var(--mint-color) !important;
  outline: none;
}
.passwordeye {
  position: absolute; /* 이미지를 절대 위치로 설정 */
  top: 50%; /* 상위 요소의 정중앙에서 시작 */
  right: 7px; /* 왼쪽으로부터 5px 떨어진 위치에 설정 */
  transform: translateY(-50%); /* Y축으로 -50% 만큼 이동하여 수직 중앙 정렬 */
  width: 13px;
  height: 10px;
  cursor: pointer;
}
.forgot-password {
  position: absolute;
  font-weight: bold;
  font-size: 11px;
  right: 7px;
  cursor: pointer;
  color: var(--navy-color);
  z-index: 10;
}
#loginclear {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--navy-color);
  border: 0;
  padding-left: 10px;
  color: white;
  font-size: 18px; /* 글씨 크기를 18px로 조정 */
  cursor: pointer; /* 버튼 위에 마우스를 올렸을 때 커서 모양을 손가락 모양으로 변경 */
  text-align: center; /* 텍스트 중앙 정렬 */
  margin-top: 45px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); /* 테두리 대신 그림자를 추가합니다. */
}
.sns-login {
  display: flex;
  justify-content: center; /* 내용을 가운데 정렬 */
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 8px 0px;
  position: relative; /* 가상 요소의 위치 기준 */
  margin-bottom: 12px; /* 하단 공간 추가 */
}
.sns-login::before,
.sns-login::after {
  content: '';
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.35);
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 16px;
}
.sns {
  margin: 0 5px; /* 로고 사이의 간격을 조정합니다. */
  width: 48px; /* 로고의 너비를 조정합니다. */
  height: 48px; /* 로고의 높이를 조정합니다. */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); /* 테두리 대신 그림자를 추가합니다. */
  border-radius: 50%; /* 로고를 원형으로 만듭니다. */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.snsimg {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* 이미지 사이의 간격을 조정 */
}
.sns img {
  max-width: 30px; /* 로고 이미지의 최대 너비를 조정합니다. */
  max-height: 30px; /* 로고 이미지의 최대 높이를 조정합니다. */
  object-fit: contain;
  cursor: pointer;
}
.registerback {
  display: flex; /* Flexbox를 이용하여 자식 요소들을 플렉스 아이템으로 만듭니다. */
  align-items: center; /* 수직 방향으로 중앙 정렬합니다. */
  justify-content: space-between; /* 아이템들 사이에 공간을 동일하게 배분합니다. */
  margin-top: 20px;
  font-weight: bold;
  font-size: 13px;
}
.register {
  padding: 4px 8px;
  color: var(--mint-color);
  font-weight: bold;
  cursor: pointer;
}
.warning {
  color: #ff4057;
}
.validation-text {
  margin-top: 5px;
  font-size: 11px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.notification {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  color: white;
  background-color: var(--navy-color);
  border-radius: 8px;
  text-align: center;
  width: 220px;
  z-index: 1000;
  opacity: 0.9;
  animation: fadeIn 0.5s, fadeOut 0.5s 1.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.9;
  }
}
@keyframes fadeOut {
  from {
    opacity: 0.9;
  }
  to {
    opacity: 0;
  }
}
.fade-in {
  animation: fadeIn 0.5s forwards;
}
.fade-out {
  animation: fadeOut 0.5s forwards;
}
</style>
