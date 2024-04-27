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
          />
        </div>

        <div class="email-input">
          <input
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            v-model="email"
          />
        </div>

        <div class="emailcheck-input">
          <input id="emailcheck" type="button" value="이메일 확인" />
        </div>
      </form>
    </div>
    <div class="loginback">
      비밀번호가 기억나신다구요?
      <div class="login" @click="gotoLogin">로그인</div>
    </div>
  </div>
</template>

<script>
export default {
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
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  align-items: center; /* 수평 방향 중앙 정렬 */
  height: 100vh; /* 뷰포트 높이를 전체 크기로 설정 */
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
  margin-bottom: 250px;
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
</style>
