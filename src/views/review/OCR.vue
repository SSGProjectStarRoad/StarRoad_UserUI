<template>
  <div class="container">
    <h3>이미지 업로드</h3>
    <div class="upload-area">
      <span v-if="!imageFile" class="upload-placeholder">+</span>
      <img v-if="imageFile" :src="imagePreview" alt="업로드 이미지" class="uploaded-image" />
    </div>
    <div class="action-area">
      <input type="file" @change="onFileChange" accept="image/*" />
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
    async confirmUpload() { // confirmUpload 메소드를 async 함수로 변경합니다.
      try {
        // rewardAdd 대신 imageUpload를 호출하게 변경합니다.
        await imageUpload(this.imageFile);
        alert('이미지 업로드가 성공적으로 완료되었습니다.');
      } catch (error) { // try 블록 내에서 발생하는 예외를 캐치합니다.
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패하였습니다. 다시 시도해주세요.');
      }
    }
  },
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
}

.upload-area {
  border: 1px dashed #ccc;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  overflow: hidden;
}

.upload-placeholder {
  font-size: 48px;
  color: #ccc;
}

.uploaded-image {
  max-width: 100%;
  max-height: 100%;
}

.action-area {
  display: flex;
  gap: 10px;
}

input[type="file"] {
  padding: 10px;
  font-size: 1em;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
}
</style>