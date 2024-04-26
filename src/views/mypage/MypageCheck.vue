<template>
  <div class="contents">
    <div class="title">Check the password</div>
    <div class="subtitle">프로필 수정을 위한 비밀번호 확인 절차입니다</div>
    <div class="registerform">
      <form action="">
        <div class="passwordinput">
          <img class="passwordeye" :src="passwordEye" alt="" />
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            v-model="password"
          />
        </div>
        <div class="registerinput">
          <input id="registerclear" type="button" value="비밀번호 확인" />
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
}
.title {
  margin-top: 60px;
  font-size: 30px;
  font-weight: 700;
}
.subtitle {
  margin-top: 20px;
  font-size: 16px;
  color: var(--dgray-color);
}

.registerform {
  margin-top: 20px;
  text-align: center;
  position: relative;
  width: 350px;
}

.passwordinput,
.registerinput {
  position: relative;
  margin-top: 20px;
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

#password {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--gray-color);
  border: 0;
  padding-left: 10px;
}
#registerclear {
  margin-top: 30px;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--navy-color);
  border: 0;
  padding-left: 10px;
  color: white;
  font-size: 18px; /* 글씨 크기를 18px로 조정 */
  font-weight: bold; /* 글씨 굵기를 bold로 설정 */
  cursor: pointer; /* 버튼 위에 마우스를 올렸을 때 커서 모양을 손가락 모양으로 변경 */
  text-align: center; /* 텍스트 중앙 정렬 */
}
</style>
