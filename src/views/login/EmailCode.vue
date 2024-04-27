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
          <input id="codeclear" type="button" value="인증 완료" />
        </div>
      </form>
    </div>
    <div class="forgotpwback">
      코드를 받지 못하셨다구요?
      <div class="forgotpw" @click="gotoForgotPassword">다시 보내기</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
    };
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
  border: 2px solid var(--mint-color); /* 입력되었을 때의 테두리색 */
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
  margin-bottom: 250px;
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
</style>
