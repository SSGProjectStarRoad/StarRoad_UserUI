<template>
  <div class="contents">
    <div></div>

    <div class="emailform">
      <form @submit.prevent="submitform">
        <div class="email-message">
          <h2>Email Verification</h2>
        </div>

        <div class="write-code">
          이메일 주소로 보낸 확인 코드를 입력해주세요.
        </div>

        <div class="emailinput">
          <input
            id="code1"
            ref="code1"
            type="text"
            v-model="code1"
            :class="{ filled: code1 }"
            maxlength="1"
            @input="autoTab('code1')"
            placeholder=" "
          />
          <input
            id="code2"
            ref="code2"
            type="text"
            v-model="code2"
            :class="{ filled: code2 }"
            maxlength="1"
            @input="autoTab('code2')"
            placeholder=" "
          />
          <input
            id="code3"
            ref="code3"
            type="text"
            v-model="code3"
            :class="{ filled: code3 }"
            maxlength="3"
            @input="autoTab('code3')"
            placeholder=" "
          />
          <input
            id="code4"
            ref="code4"
            type="text"
            v-model="code4"
            :class="{ filled: code4 }"
            maxlength="1"
            @input="autoTab(4)"
            placeholder=" "
          />
        </div>

        <div class="codeinput">
          <input
            id="codeclear"
            type="button"
            value="인증 완료"
            @click="verifyCode"
          />
        </div>
      </form>
      <div v-if="notification" ref="notification" class="notification">
        {{ notification }}
      </div>
    </div>
    <div class="forgotpwback">
      코드를 받지 못하셨다구요?
      <div class="forgotpw" @click="gotoForgotPassword">다시 보내기</div>
    </div>
  </div>
</template>

<script>
import { verifyAuthCode } from '@/api/index';

export default {
  data() {
    return {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      email: '',
      notification: '',
    };
  },
  mounted() {
    // 쿼리 파라미터로 전달된 이메일 값을 설정합니다.
    this.email = this.$route.query.email || '';
  },
  methods: {
    autoTab(refName) {
      // 입력값이 한 글자일 때만 다음 input으로 넘어가도록 합니다.
      if (this[refName] && this[refName].length === 1) {
        // 다음 input의 ref 이름을 계산합니다.
        let nextRef = (parseInt(refName[refName.length - 1]) % 4) + 1;
        nextRef = `code${nextRef}`;
        // DOM 업데이트가 끝난 후에 focus를 변경합니다.
        this.$nextTick(() => {
          this.$refs[nextRef].focus();
        });
      }
    },
    async verifyCode() {
      const code = this.code1 + this.code2 + this.code3 + this.code4;
      try {
        const response = await verifyAuthCode(this.email, code);
        if (response.data) {
          alert('인증이 완료되었습니다.');
          // 이메일 값을 쿼리 파라미터로 전달하여 라우팅
          this.$router.push({
            path: '/login/newpw',
            query: { email: this.email },
          });
        } else {
          alert('인증 코드가 올바르지 않습니다.');
        }
      } catch (error) {
        console.error(error);
        alert('오류가 발생했습니다.');
      }
    },
    async verifyCode() {
      const code = this.code1 + this.code2 + this.code3 + this.code4;
      try {
        const response = await verifyAuthCode(this.email, code);
        if (response.data) {
          this.showNotification('인증이 완료되었습니다.', () => {
            // 이메일 값을 쿼리 파라미터로 전달하여 라우팅
            this.$router.push({
              path: '/login/newpw',
              query: { email: this.email },
            });
          });
        } else {
          this.showNotification('인증 코드가 올바르지 않습니다.');
        }
      } catch (error) {
        console.error(error);
        this.showNotification('오류가 발생했습니다.');
      }
    },
    showNotification(message, callback) {
      this.notification = message;
      this.$nextTick(() => {
        const notificationElement = this.$refs.notification;
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
    gotoForgotPassword() {
      this.$router.push('/login/forgotpw');
    },
  },
};
</script>

<style scoped>
.contents {
  display: flex; /* Flexbox 레이아웃 사용 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  align-items: center; /* 수평 방향 중앙 정렬 */
  height: 100vh; /* 뷰포트 높이를 전체 크기로 설정 */
}
.emailform {
  margin-top: 40px;
  position: relative;
  width: 350px;
}
.write-code {
  color: var(--dgray-color);
  font-weight: bold;
  margin-bottom: 90px;
}
.emailinput {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  gap: 10px;
}
.codeinput {
  position: relative;
}
.emailinput input {
  margin-right: 10px; /* 각 입력 상자 사이에 오른쪽 여백을 추가합니다 */
  position: relative;
  box-sizing: border-box;
  width: calc((100% - 30px) / 4);
  height: 65px;
  border-radius: 8px;
  background-color: var(--gray-color);
  border: 0;
  text-align: center;
  font-size: 20px;
  margin: 0;
}
/* 입력값이 있는 경우 */
.emailinput input.filled {
  background-color: white; /* 입력되었을 때의 배경색 */
  border: 2px solid var(--mint-color) !important;
  outline: none; /* 입력되었을 때의 테두리색 */
}
#codeclear {
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
  margin-bottom: 150px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); /* 테두리 대신 그림자를 추가합니다. */
}
.forgotpwback {
  display: flex; /* Flexbox를 이용하여 자식 요소들을 플렉스 아이템으로 만듭니다. */
  align-items: center; /* 수직 방향으로 중앙 정렬합니다. */
  justify-content: space-between; /* 아이템들 사이에 공간을 동일하게 배분합니다. */
  margin-top: 20px;
  font-weight: bold;
  font-size: 13px;
}
.forgotpw {
  padding: 4px 8px;
  color: var(--mint-color);
  font-weight: bold;
  cursor: pointer;
}
.notification {
  position: fixed;
  top: 40%;
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
