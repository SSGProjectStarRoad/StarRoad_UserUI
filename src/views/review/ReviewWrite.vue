<template>
    <div v-if="notification" ref="notification" class="notification">
    {{ notification }}
  </div>
  <div class="contents">
    <div class="timeline-post-item">
      <div class="timeline-post-content">
        <div class="restaurant-info">
          <div class="__info">
            <h4 class="__name">
              <span>{{ shopName }}</span>
            </h4>
            <div class="__meta">{{ purchaseDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="survey">
      <div class="survey-title">어떤 점이 좋았나요 ? (공통)</div>
      <div v-for="(item, index) in surveyEssential" :key="index" class="survey-item">
        <button class="survey-option-btn" :class="{ selected: item.selected }" @click="toggleItemEs(index)">
          {{ item.text }}
        </button>
      </div>

      <div class="survey-title">어떤 점이 좋았나요 ? (선택)</div>
      <div v-for="(item, index) in surveyOptions" :key="index" class="survey-item">
        <button class="survey-option-btn" :class="{ selected: item.selected }" @click="toggleItemOp(index)">
          {{ item.text }}
        </button>
      </div>

      <div>
        <label for="upload" class="btn counter register">사진 등록하기</label>
        <input id="upload" type="file" multiple @change="uploadPictures" style="display: none" />
        <br />
        <br />
        <br />
        <div class="newPicture">
          <div v-for="(image, index) in uploadedImages.slice(0, 3)" :key="index" class="uploaded-image">
            <img :src="image.preview" class="uploaded-image-preview" alt="Uploaded Image" />
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <textarea class="text-review" placeholder="200자 이내로 기재해주세요." v-model="reviewText" @input="limitText"></textarea>
      <br />
      <div>
        <span style="color: #aaa" class="counter">({{ currentLength }} / 최대 200자)</span>
      </div>
      <br />
      <div>
        <button type="button" class="btn counter register" @click="confirmUpload">
          <span>등록하기</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { submitSurvey, fetchReviewSelections } from '@/api/index';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      uploadedImages: [],
      surveyEssential: [
        { text: '재방문하고 싶어요', selected: false },
        { text: '서비스가 마음에 들어요', selected: false },
        { text: '가격이 합리적이에요', selected: false },
        { text: '매장이 청결합니다', selected: false },
      ],
      surveyOptions: [],
      reviewText: '',
      shopName: '',
      paymentType: '',
      approvalNumber: '',
      purchaseDate: '',
      selectedTime: '',
      notification: '',
    };
  },
  created() {
    console.log('created 훅 실행됨');
    this.shopName = this.$route.query.shopName || '';
    this.paymentType = this.$route.query.paymentType || '';
    this.approvalNumber = this.$route.query.approvalNumber || '';
    this.purchaseDate = this.$route.query.purchaseDate || '';
    this.selectedTime = this.$route.query.selectedTime || '';
    this.fetchSurveyOptions();
  },
  computed: {
    currentLength() {
      return this.reviewText.length;
    },
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
    userEmail() {
      return this.email; // Vuex 스토어의 email을 userEmailComputed로 매핑합니다.
    }
  },
  computed: {

  },
  methods: {
    async fetchSurveyOptions() {
      console.log('fetchSurveyOptions method executed');
      try {
        const response = await fetchReviewSelections(this.shopName);
        console.log('response received:', response);
        if (response && Array.isArray(response)) {
          this.surveyOptions = response.map(selection => ({
            text: selection,
            selected: false,
          }));
          console.log('surveyOptions updated:', this.surveyOptions);
        } else {
          console.error('Review selections not found in the response.');
        }
      } catch (error) {
        console.error('Failed to load survey options:', error);
      }
    },
    uploadPictures(event) {
      const files = event.target.files;
      const maxFiles = 3;

      // 현재 업로드된 이미지의 개수를 확인
      const currentImageCount = this.uploadedImages.length;

      // 추가로 선택된 이미지 파일 개수를 확인
      const newFilesCount = files.length;

      // 현재 업로드된 이미지 개수와 추가로 선택된 이미지 파일 개수의 합이 최대 개수를 초과할 경우 경고 메시지 표시
      if (currentImageCount + newFilesCount > maxFiles) {
        this.showNotification(`최대 ${maxFiles}개까지 선택할 수 있습니다. `);
        event.target.value = '';
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const resizedImage = this.resizeImage(img);
            this.uploadedImages.push({
              file,
              preview: resizedImage.toDataURL(),
            });
          };
        };
      }
    },
    toggleItemEs(index) {
      this.surveyEssential[index].selected =
        !this.surveyEssential[index].selected;
    },
    toggleItemOp(index) {
      this.surveyOptions[index].selected = !this.surveyOptions[index].selected;
    },
    limitText() {
      if (this.reviewText.length > 200) {
        this.reviewText = this.reviewText.slice(0, 200);
      }
    },
    resizeImage(img) {
      const canvas = document.createElement('canvas');
      const max_size = 357.85;

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      return canvas;
    },
    async confirmUpload() {
      try {
        const formData = new FormData();

        // 리뷰 데이터 객체 생성
        const reviewData = {
          userEmail: this.userEmail,
          contents: this.reviewText,
          shopName: this.shopName,
          paymentNum: this.approvalNumber,
          purchaseDate: this.purchaseDate,
          selectedTime: this.selectedTime,
          surveyData: {
            essential: this.surveyEssential
              .filter(item => item.selected)
              .map(item => item.text),
            optional: this.surveyOptions
              .filter(item => item.selected)
              .map(item => item.text),
          },
        };

        formData.append('review', JSON.stringify(reviewData));

        // 업로드할 이미지 파일 추가
        this.uploadedImages.forEach(image => {
          formData.append('images', image.file);
        });

        // submitSurvey 함수를 호출하여 FormData를 전송합니다.
        const response = await submitSurvey(formData);

        console.log('Review Survey : ' + response);
        this.showNotification('리뷰 설문 업로드가 성공적으로 완료되었습니다.')
      } catch (error) {
        console.error('리뷰 설문 업로드 실패:', error);
        // HTTP 응답 오류 메시지 확인
        if (error.response && error.response.data) {
          console.error('서버 오류 메시지:', error.response.data.message);
          this.showNotification('리뷰 데이터 업로드에 실패하였습니다. \n오류 메시지: ${error.response.data.message}');
        } else {
          this.showNotification('리뷰 데이터 업로드에 실패하였습니다. 다시 시도해주세요.')
        }
        this.$router.push('/review/recommended');
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
@import '@/css/review/review.css';

.newPicture {
  margin: 5px;
  margin-left: 20px;
}

.contents {
  width: 400px;
  margin: auto;
}

.btn.counter.register:hover {
  cursor: pointer;
}

.write-arrow {
  transform: rotate(180deg);
}

.selected {
  background-color: var(--mint-color);
  color: var(--dgray-color);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.survey-option-btn {
  width: 100%;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.uploaded-image-preview {
  width: 357.85px;
  height: 357.85px;
  object-fit: contain;
  border-radius: 10px !important;
}

.uploaded-image-preview {
  border-radius: 10px;
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
