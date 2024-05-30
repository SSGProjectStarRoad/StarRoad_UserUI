<template>
  <div class="contents">
    <div></div>

    <div class="forgotpwform">
      <form @submit.prevent="submitForm">
        <div class="forgotpw-message">
          <h2>Forgot Password?</h2>
        </div>

        <div class="write-email">
          걱정하지마세요!<br />
          이름과 이메일 주소를 입력해주세요.
        </div>

        <div class="name-input">
          <input
            id="name"
            type="text"
            placeholder="이름을 입력해주세요"
            v-model="name"
            @input="validateName"
          />
        </div>
        <p class="validation-text">
          <span class="warning" v-if="name && !isNameValid"
            >이름을 확인해주세요</span
          >
        </p>

        <div class="email-input">
          <input
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            v-model="email"
            @input="validateEmail"
          />
        </div>
        <p class="validation-text">
          <span class="warning" v-if="!isEmailValid && email">
            이메일 주소를 입력해주세요
          </span>
        </p>

        <div class="emailcheck-input">
          <input
            id="emailcheck"
            type="button"
            value="이메일 확인"
            @click="checkEmail"
          />
        </div>
      </form>
      <div v-if="notification" ref="notification" class="notification">
        {{ notification }}
      </div>
    </div>
    <div class="loginback">
      비밀번호가 기억나신다구요?
      <div class="login" @click="gotoLogin">로그인</div>
    </div>
  </div>
</template>

<script>
import { checkEmailDuplicate, sendAuthCode } from '@/api/index';
import { validateName, validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      name: '',
      email: '',
      notification: '',
    };
  },
  computed: {
    isNameValid() {
      return validateName(this.name);
    },
    isEmailValid() {
      return validateEmail(this.email);
    },
    watch: {
      name() {
        this.validateName();
      },
      email() {
        this.validateEmailWatcher();
      },
    },
  },
  methods: {
    validateName() {
      return validateName(this.name);
    },
    gotoLogin() {
      this.$router.push('/login');
    },
    async checkEmail() {
      try {
        const response = await checkEmailDuplicate(this.email);
        console.log(response.data); // 응답 데이터를 출력하여 확인합니다.
        if (response.data === true) {
          // 이메일이 데이터베이스에 존재하면 인증 코드 전송
          await sendAuthCode(this.email);
          this.showNotification('인증 코드가 발송되었습니다.', () => {
            this.$router.push({
              path: '/login/email',
              query: { email: this.email },
            });
          });
        } else {
          console.log(this.email);
          this.showNotification('이메일이 존재하지 않습니다.');
        }
      } catch (error) {
        console.error(error);
        this.showNotification('오류가 발생했습니다.');
      }
    },
    showNotification(message, callback) {
      console.log('showNotification called with message:', message); // Debugging log
      this.notification = message;
      this.$nextTick(() => {
        const notificationElement = this.$refs.notification;
        console.log('notificationElement:', notificationElement); // Debugging log
        notificationElement.classList.add('fade-in');
        setTimeout(() => {
          notificationElement.classList.remove('fade-in');
          notificationElement.classList.add('fade-out');
          setTimeout(() => {
            this.notification = '';
            if (callback) callback();
          }, 500);
        }, 1500);
      });
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
}
.forgotpwform {
  margin-top: 40px;
  position: relative;
  width: 350px;
}
.write-email {
  color: var(--dgray-color);
  font-weight: bold;
  margin-bottom: 90px;
}
.name-input,
.email-input,
.emailcheck-input {
  position: relative;
  margin-bottom: 10px;
}
#name,
#email {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--gray-color);
  border: 0;
  padding-left: 10px;
}
#name:focus,
#email:focus {
  border: 2px solid var(--mint-color) !important;
  outline: none;
}
#emailcheck {
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
  text-align: center;
  margin-top: 45px;
  margin-bottom: 100px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); /* 테두리 대신 그림자를 추가합니다. */
}
.loginback {
  display: flex; /* Flexbox를 이용하여 자식 요소들을 플렉스 아이템으로 만듭니다. */
  align-items: center; /* 수직 방향으로 중앙 정렬합니다. */
  justify-content: space-between; /* 아이템들 사이에 공간을 동일하게 배분합니다. */
  margin-top: 20px;
  font-weight: bold;
  font-size: 13px;
}
.login {
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  color: white;
  background-color: var(--navy-color);
  border-radius: 8px;
  text-align: center;
  width: 220px;
  z-index: 2000;
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
