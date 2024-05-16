<template>
  <div class="contents">
    <div class="title">프로필 이미지 수정</div>

    <div class="registerform">
      <div class="profileimg">
        <img :src="profileImage" alt="이미지" />
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
import {
  uploadProfileimg,
  readProfileimg,
  deleteProfileimg,
} from '@/api/index';
export default {
  data() {
    return {
      selectedFile: null,
      profileImage: basicprofile, // 기본 이미지 경로
    };
  },
  methods: {
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
      };
      reader.readAsDataURL(file);
    },
    async saveImage() {
      if (!this.selectedFile) {
        alert('이미지를 선택해주세요.');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const userid = 1;
        const response = await uploadProfileimg(userid, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('이미지가 성공적으로 저장되었습니다.');
        // 프로필 이미지를 서버에서 받은 URL로 갱신할 수 있음
        this.profileImage = response.data.imageUrl;
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드 실패.');
      }
    },
    async deleteImage() {
      try {
        const userid = 1;
        await deleteProfileimg(userid);
        alert('이미지가 성공적으로 삭제되었습니다.');
        this.profileImage = basicprofile; // 기본 이미지로 리셋
      } catch (error) {
        console.error('이미지 삭제 실패:', error);
        alert('이미지 삭제 실패.');
      }
    },
    async loadImage() {
      try {
        const userid = 1;
        const response = await readProfileimg(userid);
        this.profileImage = response.data;
        console.log('Loaded Image URL:', this.profileImage);
        if (this.profileImage == '') {
          this.profileImage = basicprofile;
        }
      } catch (error) {
        console.error('이미지 불러오기 실패:', error);
        this.profileImage = basicprofile;
        // alert('이미지 불러오기 실패.');
      }
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
