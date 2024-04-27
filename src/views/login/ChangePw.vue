<template>
  <div class="contents">
    <div></div>

    <div class="changepwform">
      <form @submit.prevent="submitForm">
        <div class="changepw-message">
          <img class="success-logo" :src="successlogo" alt="" />
          <h2>Password Changed!</h2>
        </div>
        <div class="change-pw">
          비밀번호가 성공적으로<br />
          변경되었습니다.
        </div>

        <div class="gotologin">
          <input id="login" @click="gotoLogin" value="로그인하러 가기" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import successlogo from '@/img/login/Successmark.png';

export default {
  data() {
    return {
      successlogo: successlogo,
    };
  },
  methods: {
    gotoLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.contents {
  display: flex; /* Flexbox 레이아웃 사용 */
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100vh; /* 뷰포트 높이를 전체 크기로 설정 */
}
.changepwform {
  text-align: center;
  position: relative;
  width: 350px;
  margin: 0 auto;
}
.changepw-message {
  text-align: center;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
.success-logo {
  width: 130px; /* 로고의 크기를 조정합니다. */
  height: auto; /* 높이는 자동으로 조정되도록 설정합니다. */
  margin: 0 auto;
}
.change-pw {
  color: var(--dgray-color);
  font-weight: bold;
}
.gotologin {
  position: relative;
}
#login {
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
  margin-bottom: 250px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); /* 테두리 대신 그림자를 추가합니다. */
}
</style>
