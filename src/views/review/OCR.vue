<template>
  <div v-if="notification" ref="notification" class="notification">
    {{ notification }}
  </div>
  <div class="container">
    <h3>이미지 업로드</h3>
    <div class="upload-area">
      <span v-if="!imageFile" class="upload-placeholder">+</span>
      <img v-if="imageFile" :src="imagePreview" alt="업로드 이미지" class="uploaded-image" />
    </div>
    <div class="action-area">
      <input type="file" id="file-upload" @change="onFileChange" accept="image/*" />
      <label for="file-upload" class="custom-file-upload">파일 선택</label>
      <button @click="confirmUpload" :disabled="!imageFile">확인</button>
    </div>
  </div>
</template>

<script>
import { imageUpload } from '@/api/index';

export default {
  data() {
    return {
      imageFile: null,
      imagePreview: null,
      notification: '',
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    async confirmUpload() {
      try {
        const response = await imageUpload(this.imageFile);
        console.log('OCR response date : ' + response.data);
        this.showNotification('이미지 업로드가 성공적으로 완료되었습니다.');

        // 스프레드 연산자를 사용하여 response.data의 모든 데이터를 query로 전달하고 페이지 이동
        this.$router.push({
          path: '/review/check',
          query: { ...response.data },
        });
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        this.showNotification('이미지 업로드에 실패하였습니다. \n다시 시도해주세요.');
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
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-area {
  border: 3px dashed var(--navy-color);
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 10px;
  overflow: hidden;
}

.upload-placeholder {
  font-size: 48px;
  color: var(--mint-color);
}

.uploaded-image {
  max-width: 100%;
  max-height: 100%;
}

.action-area {
  display: flex;
  gap: 10px;
  align-items: center;
}

input[type='file'] {
  display: none;
}

.custom-file-upload {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  background-color: var(--mint-color);
  color: white;
  border-radius: 4px;
  display: inline-block;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  background-color: var(--navy-color);
  color: white;
  border: none;
  border-radius: 4px;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
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
  z-index: 1000;
  /* z-index 추가 */
  opacity: 0.9;
  /* 불투명도 추가 */
  animation: fadeIn 0.5s, fadeOut 0.5s 1.5s;
  /* 애니메이션 추가 */
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
