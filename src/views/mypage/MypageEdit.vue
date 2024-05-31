<template>
  <div class="contents">
    <div class="title">프로필 수정</div>

    <div class="editform">
      <form @submit.prevent="updateProfile">
        <div class="profileimg">
          <div v-if="isLoading" class="spinner"></div>
          <img
            v-else
            :src="profileImage"
            alt="이미지"
            @load="handleImageLoad"
            @error="handleImageError"
          />
        </div>
        <div class="imgfix" @click="goToEditimgPage">
          <img src="@/img/pencil.png" alt="이미지" />
        </div>

        <div class="nicknameinput">
          <input
            id="nickname"
            type="text"
            :placeholder="nicknamePlaceholder"
            v-model="nickname"
            @input="validateNickname"
          />
          <div class="nicknamecheck">
            <input
              id="nicknamechecking"
              type="button"
              value="중복 체크"
              @click="checkNickname"
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
          <span class="success" v-if="nicknameChecked && !nicknameError">{{
            nicknameSuccess
          }}</span>
        </p>

        <div class="emailinput">
          <input
            id="email"
            type="text"
            :placeholder="email || 'starroad@gmail.com'"
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

        <div class="registerinput">
          <input id="registerclear" type="submit" value="저장하기" />
        </div>
      </form>
    </div>
    <div class="withdrawal" @click="goToWitdrwaPage">계정 탈퇴하기</div>
  </div>

  <!-- 알림 모달 -->
  <div
    v-if="showAlertModal"
    class="modal-overlay"
    @click.self="closeAlertModal"
  >
    <div class="modal">
      <div class="modal-header">
        <h3>알림</h3>
      </div>
      <div class="modal-body">
        <p>{{ alertMessage }}</p>
      </div>
      <div class="modal-footer">
        <button @click="closeAlertModal">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
import passwordEye from '@/img/login/passwordeye.png';
import { mapState, mapGetters } from 'vuex';
import {
  fetchUserData,
  updateUserProfile,
  checkNicknameDuplicate,
} from '@/api/index';
import { validateNickname, validatePassword } from '@/utils/validation';
import basicprofile from '@/img/spaceman_big.png';
import { readProfileimg } from '@/api/index';

export default {
  data() {
    return {
      passwordEye: passwordEye,

      nickname: '',
      nicknamePlaceholder: '',
      password: '',
      passwordcheck: '',
      isNicknameChecked: false, // 닉네임 중복 체크 여부
      nicknameError: '',
      nicknameSuccess: '',
      nicknameChecked: false,
      passwordMatchMessage: '',
      profileImage: basicprofile,
      isLoading: true,
      showAlertModal: false, // 알림 모달 표시 여부
      alertMessage: '', // 알림 메시지
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
    isNicknameValid() {
      return validateNickname(this.nickname);
    },
    isPasswordValid() {
      return validatePassword(this.password);
    },
    isPasswordMatch() {
      return this.password === this.passwordcheck;
    },
  },
  watch: {
    nickname() {
      this.validateNickname();
    },
    password() {
      this.validatePassword();
    },
    passwordcheck() {
      this.validatePasswordMatch();
    },
  },
  created() {
    console.log('Created hook:', this.email);
    this.loadUserData();
  },
  methods: {
    handleImageLoad() {
      this.isLoading = false;
    },
    handleImageError(event) {
      event.target.src = this.basicprofile;
      this.isLoading = false;
    },
    goToWitdrwaPage() {
      this.$router.push('/mypage/withdraw'); // Vue Router를 사용하여 페이지 전환
    },
    goToEditimgPage() {
      this.$router.push('/mypage/editimg'); // Vue Router를 사용하여 페이지 전환
    },

    async loadUserData() {
      if (!this.email) {
        console.error('Email is not set');
        return;
      }
      try {
        const response = await fetchUserData(this.email);
        const userData = response.data;
        this.nicknamePlaceholder = userData.nickname;
        this.nickname = ''; // input 초기화
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    validateNickname() {
      this.nicknameChecked = false;
      if (!validateNickname(this.nickname)) {
        this.nicknameError =
          '3자 이상 10자 이하로 문자(영어, 한국어), 숫자, 특수문자를 포함해주세요';
        this.nicknameSuccess = '';
      } else {
        this.nicknameError = '';
      }
    },
    async checkNickname() {
      this.validateNickname();
      if (this.nicknameError) {
        this.nicknameSuccess = '';
        this.isNicknameChecked = false;
        return;
      }
      try {
        const response = await checkNicknameDuplicate(this.nickname);
        this.nicknameChecked = true;
        console.log(response.data);
        if (response.data) {
          this.nicknameError = '중복된 닉네임입니다';
          this.isNicknameChecked = false;
        } else {
          this.nicknameSuccess = '사용 가능한 닉네임입니다';
          this.nicknameError = '';
          this.isNicknameChecked = true;
        }
      } catch (error) {
        console.error('Error checking nickname:', error);
        this.nicknameError = '닉네임 중복 체크 중 오류가 발생했습니다';
        this.isNicknameChecked = false;
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
    async updateProfile() {
      if (!this.isNicknameChecked) {
        this.alertMessage = '닉네임 중복 체크를 해주세요';
        this.showAlertModal = true;
        return;
      }
      if (this.password && this.password !== this.passwordcheck) {
        this.alertMessage = '비밀번호가 일치하지 않습니다';
        this.showAlertModal = true;
        return;
      }
      try {
        const requestData = {
          email: this.email,
          nickname: this.nickname,
        };
        if (this.password) {
          requestData.password = this.password;
        }
        await updateUserProfile(requestData);
        this.alertMessage = '프로필이 성공적으로 업데이트되었습니다';
        this.showAlertModal = true;
        // this.$router.push('/mypage/main');
      } catch (error) {
        console.error('Error updating profile:', error);
        this.alertMessage = '프로필 수정에 실패했습니다';
        this.showAlertModal = true;
      }
    },
    closeAlertModal() {
      this.showAlertModal = false;
      if (this.alertMessage === '프로필이 성공적으로 업데이트되었습니다') {
        this.$router.push('/mypage/main');
      }
    },

    async loadImage() {
      try {
        // const userid = 1;
        const response = await readProfileimg(this.email);
        this.profileImage = response.data || basicprofile;
        console.log('Loaded Image URL:', this.profileImage);
        this.isLoading = false;
      } catch (error) {
        console.error('이미지 불러오기 실패:', error);
        this.profileImage = basicprofile;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.loadImage();
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
  position: relative;
}

.profileimg img {
  max-width: 100%; /* 이미지가 컨테이너 너비를 초과하지 않도록 */
  max-height: 100%; /* 이미지가 컨테이너 높이를 초과하지 않도록 */
}

.imgfix {
  cursor: pointer;
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
.editform {
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
  position: absolute;
  top: 50%;
  right: 7px;
  transform: translateY(-50%);
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
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.spinner {
  width: 100px;
  height: 100px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid var(--mint-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.nicknameinput input[type='text'],
.emailinput input[type='text'] {
  flex: 1;
  margin-right: 8px;
}
.nicknamecheck input[type='button'],
.emailcheck input[type='button'] {
  flex: none;
}

.withdrawal {
  margin-top: 40px;
  color: var(--mint-color);
  font-weight: 700;
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

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  margin-left: 10px;
  padding: 5px 10px;
  color: white;
  background-color: var(--navy-color);
  border-radius: 10px;
  border: 0;
}
</style>
