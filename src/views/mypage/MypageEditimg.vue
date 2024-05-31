<template>
  <div v-if="notification" ref="notification" class="notification">
    {{ notification }}
  </div>
  <div class="contents">
    <div class="title">프로필 이미지 수정</div>

    <div class="registerform">
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
      <form @submit.prevent="uploadImage">
        <div class="imginput">
          <input
            ref="fileInput"
            type="file"
            @change="handleFileChange"
            hidden
          />
          <input
            id="imginput"
            type="button"
            value="이미지 선택"
            @click="triggerFileInput"
          />
        </div>
      </form>
      <form @submit.prevent="saveImage">
        <div class="imgsave">
          <input id="imgsave" type="submit" value="이미지 저장하기" />
        </div>
      </form>
    </div>
    <div class="delete" @click="deleteImage">이미지 삭제하기</div>
  </div>
</template>

<script>
import basicprofile from '@/img/spaceman_big.png';
import { mapState, mapGetters } from 'vuex';
import {
  uploadProfileimg,
  readProfileimg,
  deleteProfileimg,
} from '@/api/index';
export default {
  data() {
    return {
      selectedFile: null,
      profileImage: '',
      isLoading: true,
      basicprofile,
      notification: '',
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
  },
  methods: {
    handleImageLoad() {
      this.isLoading = false;
    },
    handleImageError(event) {
      event.target.src = this.basicprofile;
      this.isLoading = false;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = file;

      // 파일을 읽어서 미리보기 이미지로 설정
      const reader = new FileReader();
      reader.onload = e => {
        this.profileImage = e.target.result;
        this.isLoading = false; // 이미지가 로드되었으므로 로딩 상태를 해제
      };
      reader.readAsDataURL(file);
    },
    async saveImage() {
      if (!this.selectedFile) {
        this.showNotification('이미지를 선택해주세요.');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        this.isLoading = true;
        const response = await uploadProfileimg(this.email, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.showNotification('이미지가 성공적으로 저장되었습니다.');
        // 프로필 이미지를 서버에서 받은 URL로 갱신할 수 있음
        setTimeout(async () => {
          await this.loadImage();
        }, 2000);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        this.showNotification('이미지 업로드 실패.');
        this.isLoading = false;
      }
    },
    async deleteImage() {
      try {
        // const userid = 1;
        await deleteProfileimg(this.email);
        this.showNotification('이미지가 성공적으로 삭제되었습니다.');
        this.profileImage = this.basicprofile; // 기본 이미지로 리셋
      } catch (error) {
        console.error('이미지 삭제 실패:', error);
        this.showNotification('이미지 삭제 실패.');
      }
    },
    async loadImage() {
      try {
        this.isLoading = true; // 이미지 로드 시작 시 로딩 상태 설정
        // const userid = 1;
        const response = await readProfileimg(this.email);
        this.profileImage = response.data || this.basicprofile;
        console.log('Loaded Image URL:', this.profileImage);
        this.isLoading = false; // 이미지가 로드되었으므로 로딩 상태를 해제
      } catch (error) {
        console.error('이미지 불러오기 실패:', error);
        this.profileImage = this.basicprofile;
        this.isLoading = false; // 로딩 중 오류가 발생해도 로딩 상태 해제
      }
    },
    showNotification(message) {
      this.notification = message;
      this.$nextTick(() => {
        const notificationElement = this.$refs.notification;
        notificationElement.classList.add('fade-in');
        setTimeout(() => {
          notificationElement.classList.remove('fade-in');
          notificationElement.classList.add('fade-out');
          setTimeout(() => {
            this.notification = '';
          }, 500);
        }, 1500);
      });
    },
  },
  mounted() {
    this.loadImage(); // 컴포넌트가 마운트될 때 이미지를 로드
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
  overflow: hidden;
  margin: 0 auto;
  border: 2px solid var(--mint-color);
  position: relative;
}

.profileimg img {
  max-width: 100%;
  max-height: 100%;
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
.notification {
  position: absolute;
  top: 160px;
  left: 120px;
  margin: auto;
  padding: 10px;
  color: white;
  background-color: var(--navy-color);
  border-radius: 8px;
  text-align: center;
  width: 220px;
  z-index: 1000; /* z-index 추가 */
  opacity: 0.9; /* 불투명도 추가 */
  animation: fadeIn 0.5s, fadeOut 0.5s 1.5s; /* 애니메이션 추가 */
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.9;
  }
}

@keyframes fadeOut {
  from {
    opacity: 0.9;
  }
  to {
    opacity: 0;
  }
}
.fade-in {
  animation: fadeIn 0.5s forwards;
}

.fade-out {
  animation: fadeOut 0.5s forwards;
}
</style>
