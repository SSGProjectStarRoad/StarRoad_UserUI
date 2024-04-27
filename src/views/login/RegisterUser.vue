<template>
  <div class="contents">
    <div></div>

    <div>
      <h2>Please be a member of Star Road!</h2>
    </div>

    <div class="registerform">
      <form @submit.prevent="submitForm">
        <div class="nameinput">
          <input
            id="name"
            type="text"
            placeholder="이름을 입력해주세요"
            v-model="name"
          />
        </div>

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
            placeholder="이메일 주소를 입력해주세요"
            v-model="email"
          />
          <div class="emailcheck">
            <input id="emailchecking" type="button" value="메일 인증" />
          </div>
        </div>

        <div class="emailcodeinput">
          <input
            id="emailcode"
            type="text"
            placeholder="이메일 인증 코드를 입력해주세요"
            v-model="emailcode"
          />
          <div class="emailcodecheck">
            <input id="emailcodechecking" type="button" value="인증 확인" />
          </div>
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

        <div class="birthinput">
          <input
            id="birthYear"
            type="text"
            maxlength="4"
            placeholder="YYYY"
            v-model="birthYear"
            @input="validateBirthInput"
            :class="{ 'invalid-input': !birthYearValid }"
          />
          <span>/</span>
          <input
            id="birthMonth"
            type="text"
            maxlength="2"
            placeholder="MM"
            v-model="birthMonth"
            @input="validateBirthInput"
          />
          <span>/</span>
          <input
            id="birthDay"
            type="text"
            maxlength="2"
            placeholder="DD"
            v-model="birthDay"
            @input="validateBirthInput"
          />
        </div>

        <div class="phoneinput">
          <input
            id="phone"
            type="text"
            placeholder="핸드폰 번호를 입력해주세요(- 제외 11자리)"
            v-model="nickname"
          />
        </div>

        <div class="genderinput">
          <select name="gender" id="gender">
            <option value="choice" disabled selected hidden>
              성별을 선택해주세요
            </option>
            <option value="male" style="color: black">남성</option>
            <option value="female">여성</option>
            <option value="none">선택안함</option>
          </select>
        </div>
        <!-- <input type="radio" class="radio" name="gender" id="male" />
          <label for="male" style="margin-left: 6px">남성 </label>
          <input type="radio" class="radio" name="gender" id="female" />
          <label for="female" style="margin-left: 6px">여성 </label>
          <input type="radio" class="radio" name="gender" id="none" />
          <label for="none" style="margin-left: 6px">선택안함</label> -->
      </form>

      <div class="agreeinput1">
        <input type="checkbox" class="agree" id="agreecheck1" />
        <label for="agreecheck1" class="small-text" style="margin-left: 6px"
          >서비스 약관에 동의합니다.
        </label>
        <a href="#" target="_blank">내용보기</a>
      </div>
      <div class="agreeinput2">
        <input type="checkbox" class="agree" id="agreecheck2" />
        <label for="agreecheck2" class="small-text" style="margin-left: 6px"
          >개인정보 수집 및 이용에 동의합니다.
        </label>
        <a href="#" target="_blank">내용보기</a>
      </div>
      <div class="registerinput">
        <input id="registerclear" type="button" value="회원가입 완료" />
      </div>
      <div class="snsregister">Or Register with</div>
      <div class="snsimg">
        <div class="sns">
          <img class="kakao" :src="kakao" alt="" />
        </div>
        <div class="sns">
          <img class="google" :src="google" alt="" />
        </div>
        <div class="sns">
          <img class="naver" :src="naver" alt="" />
        </div>
      </div>
    </div>
    <div class="loginback">
      이미 계정이 있으시다구요?
      <div class="login" @click="gotoLogin">로그인</div>
    </div>
  </div>
</template>

<script>
import passwordEye from '@/img/login/passwordeye.png';
import kakao from '@/img/login/kakaologo.png';
import google from '@/img/login/googlelogo.png';
import naver from '@/img/login/naverlogo.png';

export default {
  data() {
    return {
      passwordEye: passwordEye,
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      kakao: kakao,
      google: google,
      naver: naver,
    };
  },
  methods: {
    validateBirthInput(event) {
      // 입력 검증 로직을 여기에 추가하세요.
      // 예: 연도가 4자리인지, 월이 01-12 범위 내에 있는지, 일이 01-31 범위 내에 있는지 등
      const yearInput = event.target.value; // 현재 입력된 연도
      this.birthYearValid = yearInput.length === 4; // 연도가 4자리인지 확인
    },
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
.registerform {
  text-align: center;
  position: relative;
  width: 350px;
}
.nameinput,
.passwordinput,
.passwordcheckinput,
/* .birthinput, */
.phoneinput,
.genderinput,
.registerinput {
  position: relative;
  margin-top: 20px;
}
.birthinput {
  display: flex; /* Flexbox 레이아웃 적용 */
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 항목들을 세로축 중앙으로 정렬 */
  gap: 5px; /* 입력 필드 사이의 간격 */
  margin-top: 20px;
}
.birthinput input[type='text'] {
  box-sizing: border-box;
  height: 40px; /* 높이 설정 */
  padding: 0 10px; /* 양 옆에 패딩 */
  border: 1px solid #ccc; /* 테두리 설정 */
  border-radius: 5px; /* 둥근 모서리 */
  background-color: white; /* 배경색 */
}
.birthinput span {
  color: #ccc; /* 구분자 색상 */
  margin: 0 5px; /* 구분자와 입력 필드 사이의 간격 */
}
.nicknameinput,
.emailinput {
  margin-top: 20px;
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 항목들 사이에 여백을 균등하게 배분 */
  align-items: center; /* 세로 방향 중앙 정렬 */
}
.emailcodeinput {
  margin-top: 20px;
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 항목들 사이에 여백을 균등하게 배분 */
  align-items: center; /* 세로 방향 중앙 정렬 */
}
.nicknameinput input[type='text'],
.emailinput input[type='text'],
.emailcodeinput input[type='text'] {
  flex: 1; /* Flexbox 아이템이 가능한 공간을 모두 채우도록 설정 */
  margin-right: 8px; /* 버튼과의 간격 */
}
.nicknamecheck input[type='button'],
.emailcheck input[type='button'],
.emailcodecheck input[type='button'] {
  flex: none; /* 버튼 크기가 자동으로 조정되지 않도록 설정 */
}
.agreeinput1 {
  text-align: left; /* 왼쪽 정렬로 설정 */
  width: 350px; /* registerform과 동일한 너비로 설정 */
  margin-top: 10px;
  padding-left: 0; /* 왼쪽 패딩을 0으로 설정하여 왼쪽 끝에서 시작 */
}
.agreeinput2 {
  text-align: left;
  width: 350px;
  padding-left: 0;
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
#name,
#nickname,
#email,
#emailcode,
#password,
#passwordcheck,
#birthYear,
#birthMonth,
#birthDay,
#phone,
#gender {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--gray-color);
  border: 0;
  padding-left: 10px;
}
#registerclear {
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
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); /* 테두리 대신 그림자를 추가합니다. */
}
#nicknamechecking,
#emailchecking,
#emailcodechecking {
  width: 90px;
  border-radius: 8px;
  height: 48px;
  background-color: var(--navy-color);
  color: white;
  border: 0;
  cursor: pointer;
}
.small-text {
  font-size: 15px;
}

.invalid-input {
  border-bottom: 2px solid red;
}

.snsregister {
  display: flex;
  justify-content: center; /* 내용을 가운데 정렬 */
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 8px 0px;
  position: relative; /* 가상 요소의 위치 기준 */
  margin-bottom: 12px; /* 하단 공간 추가 */
}
.snsregister::before,
.snsregister::after {
  content: '';
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.35);
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 16px;
}
.snsimg {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* 이미지 사이의 간격을 조정 */
}
.sns {
  margin: 0 5px; /* 로고 사이의 간격을 조정합니다. */
  width: 48px; /* 로고의 너비를 조정합니다. */
  height: 48px; /* 로고의 높이를 조정합니다. */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); /* 테두리 대신 그림자를 추가합니다. */
  border-radius: 50%; /* 로고를 원형으로 만듭니다. */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.sns img {
  max-width: 30px; /* 로고 이미지의 최대 너비를 조정합니다. */
  max-height: 30px; /* 로고 이미지의 최대 높이를 조정합니다. */
  object-fit: contain;
  cursor: pointer;
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
