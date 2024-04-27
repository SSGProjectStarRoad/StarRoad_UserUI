<template>
  <div class="contents">
    <div></div>

    <div class="createpwform">
      <form @submit.prevent="submitForm">
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
            v-model="password"
          />
          <img class="passwordeye" :src="passwordEye" alt="" />
        </div>

        <div class="pwcheck-input">
          <input
            id="passwordcheck"
            type="password"
            placeholder="새 비밀번호를 한번 더 입력해주세요"
            v-model="passwordcheck"
          />
          <img class="passwordeye" :src="passwordEye" alt="" />
        </div>

        <div class="newpw-input">
          <input id="pwclear" type="button" value="비밀번호 변경" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import passwordEye from '@/img/login/passwordeye.png';

export default {
  data() {
    return {
      passwordEye: passwordEye,
    };
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
</style>
