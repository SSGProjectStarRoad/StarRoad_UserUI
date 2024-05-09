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
  overflow: hidden;
  margin: 0 auto;
  border: 2px solid var(--mint-color);
}

.profileimg img {
  max-width: 100%;
  max-height: 100%;
}
.imgfix {
  position: absolute;
  top: 140px;
  right: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--dgray-color);
}
.imgfix img {
  width: 60%;
  height: auto;
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
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

.delete {
  margin-top: 40px;
  color: var(--mint-color);
  font-weight: 700;
  cursor: pointer;
}
</style>
