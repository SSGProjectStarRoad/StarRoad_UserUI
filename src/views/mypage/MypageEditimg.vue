<template>
  <div class="contents">
    <div class="title">프로필 이미지 수정</div>

    <div class="registerform">
      <div class="profileimg">
        <img src="@/img/spaceman_big.png" alt="이미지" />
      </div>
      <form action="">
        <div class="imginput">
          <input id="imginput" type="button" value="이미지 선택" />
        </div>
      </form>
      <form action="">
        <div class="imgsave">
          <input id="imgsave" type="button" value="이미지 저장하기" />
        </div>
      </form>
    </div>
    <div class="delete">이미지 삭제하기</div>
  </div>
</template>

<script>
import passwordEye from '@/img/login/passwordeye.png';
export default {};
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
.profileimg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden; /* 이미지가 컨테이너 밖으로 나가지 않도록 */
  margin: 0 auto; /* 자동 마진으로 가운데 정렬 */
  border: 2px solid var(--mint-color);
}

.profileimg img {
  max-width: 100%; /* 이미지가 컨테이너 너비를 초과하지 않도록 */
  max-height: 100%; /* 이미지가 컨테이너 높이를 초과하지 않도록 */
}

.imgfix {
  position: absolute;
  top: 140px;
  right: 130px;
  display: flex; /* Flexbox 레이아웃 적용 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--dgray-color);
}
.imgfix img {
  width: 60%; /* 이미지의 크기를 .imgfix의 크기에 맞춤 */
  height: auto; /* 비율 유지 */
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
.imginput {
  position: relative;
  margin-top: 20px;
}

#registerclear,
#imginput,
#imgsave {
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

.delete {
  margin-top: 40px;
  color: var(--mint-color);
  font-weight: 700;
  cursor: pointer;
}
</style>
