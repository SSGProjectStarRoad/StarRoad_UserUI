<template>
  <div class="contents">
    <div></div>

    <div class="createpwform">
      <form @submit.prevent="updatePassword">
        <div class="createpw-message">
          <h2>Create new password?</h2>
        </div>

        <div class="create-pw">
          새 비밀번호는 이전 비밀번호와 달라야 합니다.
        </div>

        <div class="newpw-input">
          <input
            id="password"
            type="password"
            placeholder="새 비밀번호를 입력해주세요"
            v-model="newPassword"
            @input="validatePasswordMatch"
          />
          <img class="passwordeye" :src="passwordEye" alt="" />
        </div>

        <div class="pwcheck-input">
          <input
            id="passwordcheck"
            type="password"
            placeholder="새 비밀번호를 한번 더 입력해주세요"
            v-model="confirmPassword"
            @input="validatePasswordMatch"
          />
          <img class="passwordeye" :src="passwordEye" alt="" />
        </div>
        <p class="validation-text">
          <span
            v-if="passwordMessage"
            :class="{ warning: !isPasswordMatch, success: isPasswordMatch }"
          >
            {{ passwordMessage }}
          </span>
        </p>

        <div class="newpw-input">
          <input
            id="pwclear"
            type="submit"
            value="비밀번호 변경"
            @click="updatePassword"
          />
        </div>
      </form>
      <div v-if="notification" ref="notification" class="notification">
        {{ notification }}
      </div>
    </div>
  </div>
</template>

<script>
import passwordEye from '@/img/login/passwordeye.png';
import { updatePassword } from '@/api/index';

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      email: '',
      passwordMessage: '',
      isPasswordMatch: false,
      passwordEye: passwordEye,
      notification: '',
    };
  },
  mounted() {
    const email = this.$route.query.email || '';
    if (validateEmail(email)) {
      this.email = email;
      console.log('Mounted: Email is valid:', this.email);
    } else {
      console.error('Mounted: Invalid email:', email);
    }
  },
  methods: {
    validatePasswordMatch() {
      if (this.newPassword === this.confirmPassword) {
        this.passwordMessage = '비밀번호가 일치합니다';
        this.isPasswordMatch = true;
      } else {
        this.passwordMessage = '비밀번호가 일치하지 않습니다';
        this.isPasswordMatch = false;
      }
    },
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.showNotification('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!validateEmail(this.email)) {
        this.showNotification('유효한 이메일 주소를 입력하세요.');
        return;
      }
      try {
        console.log('Update Password: Email:', this.email); // 이메일 값 확인
        const response = await updatePassword(this.email, this.newPassword);
        if (response.status === 200) {
          this.showNotification('비밀번호가 성공적으로 변경되었습니다.', () => {
            this.$router.push('/login/changepw');
          });
        } else {
          this.showNotification('비밀번호 변경에 실패했습니다.');
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          this.showNotification(error.response.data); // 서버에서 반환된 오류 메시지 표시
        } else {
          this.showNotification('비밀번호 변경 중 오류가 발생했습니다.');
        }
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
  },
};
</script>

<style scoped>
.contents {
  display: flex; /* Flexbox 레이아웃 사용 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  align-items: center; /* 수평 방향 중앙 정렬 */
  height: 100vh; /* 뷰포트 높이를 전체 크기로 설정 */
  /* padding-top: 60px; */
}
.createpwform {
  position: relative;
  width: 350px;
  margin: 40px;
}
.create-pw {
  color: var(--dgray-color);
  font-weight: bold;
  margin-bottom: 90px;
}
.newpw-input,
.pwcheck-input,
.newpw-input {
  position: relative;
  margin-bottom: 10px;
}
#password,
#passwordcheck {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--gray-color);
  border: 0;
  padding-left: 10px;
}
#password:focus,
#passwordcheck:focus {
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
#pwclear {
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
.success {
  color: var(--mint-color);
}
.warning {
  color: #ff4057;
}
.validation-text {
  margin-top: 5px;
  font-size: 12.5px;
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
  width: 230px;
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
