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
            @input="validateName"
          />
        </div>
        <p class="validation-text">
          <span class="warning" v-if="name && !isNameValid"
            >이름을 확인해주세요</span
          >
        </p>

        <div class="nicknameinput">
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            v-model="nickname"
            @input="validateNickname"
          />
          <div class="nicknamecheck">
            <input
              id="nicknamechecking"
              type="button"
              @click="validateAndCheckNickname"
              value="중복 체크"
            />
          </div>
        </div>
        <p class="validation-text">
          <span class="warning" v-if="nickname && !isNicknameValid"
            >3자 이상 10자 이하로 문자(영어, 한국어), 숫자, 특수문자를
            포함해주세요</span
          >
          <span class="warning" v-if="nicknameChecked && nicknameError">{{
            nicknameError
          }}</span>
          <span class="success" v-if="nicknameChecked && nicknameSuccess">{{
            nicknameSuccess
          }}</span>
        </p>

        <div class="emailinput">
          <input
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            v-model="email"
            @input="validateEmail"
          />
          <div class="emailcheck">
            <input
              id="emailchecking"
              type="button"
              @click="validateAndCheckEmail"
              value="메일 인증"
            />
          </div>
        </div>
        <p class="validation-text">
          <span
            v-if="emailError"
            :class="{ warning: isEmailDuplicate, success: !isEmailDuplicate }"
          >
            {{ emailError }}
          </span>
        </p>

        <div class="emailcodeinput">
          <input
            id="emailcode"
            type="text"
            placeholder="이메일 인증 코드를 입력해주세요"
            v-model="emailcode"
          />
          <div class="emailcodecheck">
            <input
              id="emailcodechecking"
              type="button"
              value="인증 확인"
              @click="verifyEmailCode"
            />
          </div>
        </div>
        <p class="validation-text">
          <span
            v-if="emailCodeMessage"
            :class="{ warning: !emailCodeVerified, success: emailCodeVerified }"
          >
            {{ emailCodeMessage }}
          </span>
        </p>

        <div class="passwordinput">
          <img class="passwordeye" :src="passwordEye" alt="" />
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            v-model="password"
            @input="validatePassword"
          />
        </div>
        <p class="validation-text">
          <span class="warning" v-if="password && !isPasswordValid">
            8자 이상, 숫자, 영문(대/소문자), 특수문자를 각각 하나 이상
            포함해주세요
          </span>
        </p>

        <div class="passwordcheckinput">
          <img class="passwordeye" :src="passwordEye" alt="" />
          <input
            id="passwordcheck"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            v-model="passwordcheck"
            @input="validatePasswordMatch"
          />
        </div>
        <p class="validation-text">
          <span
            v-if="passwordcheck"
            :class="{ warning: !isPasswordMatch, success: isPasswordMatch }"
          >
            {{ passwordMatchMessage }}
          </span>
        </p>

        <div class="birthinput">
          <input
            id="birthYear"
            type="text"
            maxlength="4"
            placeholder="YYYY"
            v-model="birthYear"
            @input="validateBirthYear"
            ref="birthYear"
          />
          <span>/</span>
          <input
            id="birthMonth"
            type="text"
            maxlength="2"
            placeholder="MM"
            v-model="birthMonth"
            @input="validateBirthMonth"
            ref="birthMonth"
          />
          <span>/</span>
          <input
            id="birthDay"
            type="text"
            maxlength="2"
            placeholder="DD"
            v-model="birthDay"
            @input="validateBirthDay"
            ref="birthDay"
          />
        </div>
        <p class="validation-text">
          <span
            v-if="birthYearValidationMessage"
            :class="{ warning: !birthYearValid, success: birthYearValid }"
          >
            {{ birthYearValidationMessage }}
          </span>
          <span
            v-if="birthMonthValidationMessage"
            :class="{ warning: !birthMonthValid, success: birthMonthValid }"
          >
            {{ birthMonthValidationMessage }}
          </span>
          <span
            v-if="birthDayValidationMessage"
            :class="{ warning: !birthDayValid, success: birthDayValid }"
          >
            {{ birthDayValidationMessage }}
          </span>
          <span
            v-if="birthValidationMessage && isBirthValid"
            :class="{ success: isBirthValid }"
          >
            {{ birthValidationMessage }}
          </span>
        </p>

        <div class="phoneinput">
          <input
            id="phone"
            type="text"
            placeholder="핸드폰 번호를 입력해주세요(- 제외 11자리)"
            v-model="phone"
            @input="validatePhone"
          />
        </div>
        <p class="validation-text">
          <span class="warning" v-if="phone && !isPhoneValid"
            >핸드폰 번호를 확인해주세요</span
          >
        </p>

        <div class="genderinput">
          <select name="gender" id="gender" v-model="gender">
            <option value="choice" disabled selected hidden>
              성별을 선택해주세요
            </option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>

        <div class="agreeinput1">
          <input
            type="checkbox"
            class="agree"
            id="agreecheck1"
            v-model="agreecheck1"
          />
          <label for="agreecheck1" class="small-text" style="margin-left: 6px"
            >서비스 약관에 동의합니다.</label
          >
          <a href="#" @click.prevent="openTermsModal">내용보기</a>
        </div>
        <div class="agreeinput2">
          <input
            type="checkbox"
            class="agree"
            id="agreecheck2"
            v-model="agreecheck2"
          />
          <label for="agreecheck2" class="small-text" style="margin-left: 6px"
            >개인정보 수집 및 이용에 동의합니다.</label
          >
          <a href="#" @click.prevent="openPrivacyModal">내용보기</a>
        </div>
        <div class="registerinput">
          <button id="registerclear" type="submit">회원가입 완료</button>
        </div>
        <p class="validation-text">
          <span class="warning" v-if="formSubmitted && !isFormValid"
            >위에 모든 사항을 입력해주세요</span
          >
        </p>
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
      </form>
    </div>
    <div class="loginback">
      이미 계정이 있으시다구요?
      <div class="login" @click="gotoLogin">로그인</div>
    </div>
    <TermsModal :isVisible="isTermsModalVisible" @close="closeTermsModal" />
    <PrivacyModal
      :isVisible="isPrivacyModalVisible"
      @close="closePrivacyModal"
    />
  </div>
</template>

<script>
import passwordEye from '@/img/login/passwordeye.png';
import kakao from '@/img/login/kakaologo.png';
import google from '@/img/login/googlelogo.png';
import naver from '@/img/login/naverlogo.png';
import TermsModal from '@/components/TermsModal.vue';
import PrivacyModal from '@/components/PrivacyModal.vue';
import { registerUser } from '@/api/index';
import {
  checkNicknameDuplicate,
  checkEmailDuplicate,
  sendAuthCode,
  verifyAuthCode,
} from '@/api/index';
import {
  validateName,
  validateNickname,
  validateEmail,
  validatePassword,
  validatePhone,
  validateYear,
  validateMonth,
  validateDay,
  validateBirth,
} from '@/utils/validation';

export default {
  components: {
    TermsModal,
    PrivacyModal,
  },
  data() {
    return {
      name: '',
      nickname: '',
      nicknameError: '',
      nicknameSuccess: '',
      isNicknameDuplicate: false,
      nicknameChecked: false,
      email: '',
      emailError: '',
      isEmailDuplicate: false,
      emailcode: '',
      emailCodeMessage: '',
      emailCodeVerified: false,
      password: '',
      passwordcheck: '',
      passwordMatchMessage: '',
      passwordEye: passwordEye,
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      birthYearValid: true,
      birthMonthValid: true,
      birthDayValid: true,
      birthYearValidationMessage: '',
      birthMonthValidationMessage: '',
      birthDayValidationMessage: '',
      birthValidationMessage: '',
      isBirthValid: true,
      phone: '',
      gender: 'choice',
      agreecheck1: false,
      agreecheck2: false,
      formSubmitted: false,
      formErrorMessage: '',
      isTermsModalVisible: false, // 서비스 약관 모달 표시 여부 상태 추가
      isPrivacyModalVisible: false, // 개인정보 수집 및 이용 모달 표시 여부 상태 추가
      kakao: kakao,
      google: google,
      naver: naver,
    };
  },
  computed: {
    isNameValid() {
      return validateName(this.name);
    },
    isNicknameValid() {
      return validateNickname(this.nickname);
    },
    isEmailValid() {
      return validateEmail(this.email);
    },
    isPasswordValid() {
      return validatePassword(this.password);
    },
    isPasswordMatch() {
      return this.password === this.passwordcheck;
    },
    isPhoneValid() {
      return validatePhone(this.phone);
    },
    isFormValid() {
      return (
        this.isNameValid &&
        this.isEmailValid &&
        this.isNicknameValid &&
        this.isPasswordValid &&
        this.isPasswordMatch &&
        this.isBirthValid &&
        this.isPhoneValid &&
        this.gender !== 'choice' &&
        this.agreecheck1 &&
        this.agreecheck2 &&
        !this.nicknameError &&
        !this.emailError
      );
    },
  },
  watch: {
    name() {
      this.validateName();
    },
    nickname() {
      this.validateNickname();
    },
    email() {
      this.validateEmailWatcher();
    },
    password() {
      this.validatePassword();
    },
    passwordcheck() {
      this.validatePasswordMatch();
    },
    birthYear() {
      this.validateBirthYear();
    },
    birthMonth() {
      this.validateBirthMonth();
    },
    birthDay() {
      this.validateBirthDay();
    },
    phone() {
      this.validatePhone();
    },
  },
  methods: {
    validateName() {
      return validateName(this.name);
    },
    validateNickname() {
      this.nicknameChecked = false;
      if (!validateNickname(this.nickname)) {
        this.nicknameError =
          '3자 이상 10자 이하로 문자(영어, 한국어), 숫자, 특수문자를 포함해주세요';
      } else {
        this.nicknameError = '';
      }
    },
    async validateAndCheckNickname() {
      this.validateNickname();
      if (this.nicknameError) {
        this.nicknameSuccess = '';
        this.isNicknameDuplicate = false;
        return;
      }
      this.nicknameChecked = true;
      this.nicknameError = '';
      this.nicknameSuccess = '';
      try {
        const response = await checkNicknameDuplicate(this.nickname);
        if (response.data) {
          this.nicknameError = '중복된 닉네임입니다';
          this.isNicknameDuplicate = true;
        } else {
          this.nicknameSuccess = '사용 가능한 닉네임입니다';
          this.isNicknameDuplicate = false;
        }
      } catch (error) {
        this.nicknameError = '닉네임 중복 체크 중 오류가 발생했습니다';
        this.isNicknameDuplicate = true;
      }
    },
    validateEmailWatcher() {
      return validateEmail(this.email);
    },
    async validateAndCheckEmail() {
      if (!validateEmail(this.email)) {
        this.emailError = '이메일 주소를 확인해주세요';
        this.isEmailDuplicate = false;
        return;
      }
      this.emailError = '';
      try {
        const response = await checkEmailDuplicate(this.email);
        if (response.data) {
          this.emailError = '중복된 이메일입니다';
          this.isEmailDuplicate = true;
        } else {
          this.emailError = '인증 코드가 전송되었습니다';
          this.isEmailDuplicate = false;
          await sendAuthCode(this.email);
        }
      } catch (error) {
        this.emailError = '이메일 중복 체크 중 오류가 발생했습니다';
        this.isEmailDuplicate = true;
      }
    },
    async verifyEmailCode() {
      try {
        const response = await verifyAuthCode(this.email, this.emailcode);
        if (response.data) {
          this.emailCodeMessage = '이메일 인증이 완료되었습니다';
          this.emailCodeVerified = true;
          this.emailError = '';
        } else {
          this.emailCodeMessage = '인증 코드가 올바르지 않습니다';
          this.emailCodeVerified = false;
        }
      } catch (error) {
        this.emailCodeMessage = '이메일 인증 코드 검증 중 오류가 발생했습니다';
        this.emailCodeVerified = false;
      }
    },
    validatePassword() {
      return validatePassword(this.password);
    },
    validatePasswordMatch() {
      if (this.password === this.passwordcheck) {
        this.passwordMatchMessage = '비밀번호가 일치합니다';
      } else {
        this.passwordMatchMessage = '비밀번호가 일치하지 않습니다';
      }
      return this.password === this.passwordcheck;
    },
    validateBirthYear() {
      const isValid = validateYear(this.birthYear);
      this.birthYearValid = isValid;
      this.updateBirthValidationMessage();
      return isValid;
    },
    validateBirthMonth() {
      const isValid = validateMonth(this.birthMonth);
      this.birthMonthValid = isValid;
      this.updateBirthValidationMessage();
      return isValid;
    },
    validateBirthDay() {
      const isValid = validateDay(this.birthDay);
      this.birthDayValid = isValid;
      this.updateBirthValidationMessage();
      return isValid;
    },
    updateBirthValidationMessage() {
      const isValid = validateBirth(
        this.birthYear,
        this.birthMonth,
        this.birthDay,
      );
      this.birthValidationMessage = isValid ? '' : '유효한 날짜를 입력해주세요';
      this.isBirthValid = isValid;
    },
    validatePhone() {
      return validatePhone(this.phone);
    },
    gotoLogin() {
      this.$router.push('/login');
    },
    openTermsModal() {
      this.isTermsModalVisible = true;
    },
    closeTermsModal() {
      this.isTermsModalVisible = false;
    },
    openPrivacyModal() {
      this.isPrivacyModalVisible = true;
    },
    closePrivacyModal() {
      this.isPrivacyModalVisible = false;
    },
    async submitForm() {
      this.formSubmitted = true;
      console.log(this.isFormValid);
      console.log(this.isNameValid);
      console.log(this.isEmailValid);
      console.log(this.isNicknameValid);
      console.log(this.isPasswordValid);
      console.log(this.isPasswordMatch);
      console.log(this.isBirthValid);
      console.log(this.isPhoneValid);
      console.log(this.isNicknameValid);
      console.log(this.gender);
      console.log(this.agreecheck1);
      console.log(this.agreecheck2);
      console.log(this.nicknameError);
      console.log(this.emailError);
      if (this.isFormValid) {
        try {
          const userData = {
            name: this.name,
            nickname: this.nickname,
            email: this.email,
            password: this.password,
            birth: `${this.birthYear}-${this.birthMonth}-${this.birthDay}`,
            phone: this.phone,
            gender: this.gender.toUpperCase(),
            provider_type: 'LOCAL',
            agreecheck1: this.agreecheck1,
            agreecheck2: this.agreecheck2,
          };

          const response = await registerUser(userData);
          if (response.status === 200) {
            console.log('회원가입 성공');
            this.$router.push('/main'); // 회원가입 성공 후 메인 페이지로 이동
          } else {
            console.log('회원가입 실패');
            this.formErrorMessage = '회원가입에 실패했습니다.';
          }
        } catch (error) {
          console.log('API 호출 오류:', error);
          this.formErrorMessage = '회원가입 중 오류가 발생했습니다.';
        }
      } else {
        this.formErrorMessage = '위에 모든 사항을 입력해주세요';
      }
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
  padding-bottom: 0px;
}
.registerform {
  text-align: center;
  position: relative;
  width: 350px;
}
.input.my-input:focus {
  border-color: var(--mint-color); /* 원하는 색상으로 변경 */
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
#name:focus,
#nickname:focus,
#email:focus,
#emailcode:focus,
#password:focus,
#passwordcheck:focus,
#birthYear:focus,
#birthMonth:focus,
#birthDay:focus,
#phone:focus,
#gender:focus {
  border: 2px solid var(--mint-color) !important;
  outline: none;
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
.success {
  color: var(--mint-color);
}
.warning {
  color: #ff4057;
}
.validation-text {
  margin-top: 5px;
  font-size: 12.5px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
</style>
