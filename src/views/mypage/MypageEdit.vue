<template>
  <div class="contents">
    <div class="title">프로필 수정</div>

    <div class="registerform">
      <form action="">
        <div class="profileimg">
          <img src="@/img/spaceman_big.png" alt="이미지" />
        </div>
        <div class="imgfix"><img src="@/img/pencil.png" alt="이미지" /></div>
        <div class="nicknameinput">
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            v-model="nickname"
          />
          <div class="nicknamecheck">
            <input id="nicknamechecking" type="button" value="중복 체크" />
          </div>
        </div>
        <div class="emailinput">
          <input
            id="email"
            type="text"
            placeholder="starroad@gmail.com"
            v-model="email"
            readonly="true"
          />
        </div>
        <div class="passwordinput">
          <img class="passwordeye" :src="passwordEye" alt="" />
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            v-model="password"
          />
        </div>
        <div class="passwordcheckinput">
          <img class="passwordeye" :src="passwordEye" alt="" />
          <input
            id="passwordcheck"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            v-model="passwordcheck"
          />
        </div>
        <div class="registerinput">
          <input id="registerclear" type="button" value="저장하기" />
        </div>
      </form>
    </div>
    <div class="withdrawal">계정 탈퇴하기</div>
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
.nameinput,
.passwordinput,
.passwordcheckinput,
.passwordinput,
.registerinput,
.emailinput {
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
#nickname,
#email,
#password,
#passwordcheck {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--gray-color);
  border: 1px solid white;
  padding-left: 10px;
  outline: none;
}
#nickname:focus,
#email:focus,
#password:focus,
#passwordcheck:focus {
  border: 2px solid var(--mint-color);
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
#nicknamechecking {
  border-radius: 8px;
  height: 48px;
  background-color: var(--navy-color);
  color: white;
  border: 0;
  cursor: pointer;
}
.nicknameinput {
  margin-top: 20px;
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 항목들 사이에 여백을 균등하게 배분 */
  align-items: center; /* 세로 방향 중앙 정렬 */
}
.nicknameinput input[type='text'],
.emailinput input[type='text'] {
  flex: 1; /* Flexbox 아이템이 가능한 공간을 모두 채우도록 설정 */
  margin-right: 8px; /* 버튼과의 간격 */
}
.nicknamecheck input[type='button'],
.emailcheck input[type='button'] {
  flex: none; /* 버튼 크기가 자동으로 조정되지 않도록 설정 */
}

.withdrawal {
  margin-top: 40px;
  color: var(--mint-color);
  font-weight: 700;
  cursor: pointer;
}
</style>
