<template>
  <div class="contents">
    <div class="title">탈퇴하기</div>

    <div class="registerform">
      <div class="main-content">
        {{ userName }} 님과 이별인가요? <br />
        너무 아쉬워요...
      </div>
      <div class="sub-content">
        계정을 삭제하면 그동안의 모든 활동 정보가 삭제됩니다.
      </div>
      <form action="">
        <div class="withdraw">
          <input id="withdraw" type="button" value="탈퇴하기" />
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
      userName: '이수연', // 계정 주인의 이름
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
  font-size: 25px;
  font-weight: 700;
  color: var(--dgray-color);
}
.main-content {
  font-size: 24px;
  font-weight: 700;
  text-align: left;
}
.sub-content {
  margin-top: 10px;
  font-size: 12px;
  color: var(--dgray-color);
  text-align: left;
}

.registerform {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-top: 20px;
  padding-top: 60px;
  border-top: 1px solid var(--gray-color);
  text-align: center;
  position: relative;
  width: 350px;
}

#withdraw {
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
