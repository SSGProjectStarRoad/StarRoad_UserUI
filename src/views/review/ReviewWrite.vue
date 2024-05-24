<template>
  <div class="contents">
    <div class="timeline-post-item">
      <div class="timeline-post-content">
        <div class="restaurant-info">
          <div class="__info">
            <h4 class="__name"><span>{{ shopName }}</span></h4>
            <div class="__meta"> {{ purchaseDate }} </div>
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
        <input id="upload" type="file" multiple @change="uploadPictures" style="display: none;">
        <br />
        <br />
        <br />
        <div class="newPicture">
          <div v-for="(image, index) in uploadedImages.slice(0, 3)" :key="index" class="uploaded-image">
            <img :src="image.preview" class="uploaded-image-preview" alt="Uploaded Image">
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <textarea class="text-review" placeholder="200자 이내로 기재해주세요." v-model="reviewText" @input="limitText"></textarea>
      <br />
      <div>
        <span style="color:#aaa;" class="counter">({{ currentLength }} / 최대 200자)</span>
      </div>
      <br />
      <div>
        <button type="button" class="btn counter register" @click="confirmUpload">
          <span class="">등록하기</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { submitSurvey, fetchReviewSelections } from '@/api/index';

export default {
  data() {
    return {
      userNickname: "hklee",
      uploadedImages: [],
      surveyEssential: [
        { text: "재방문하고 싶어요", selected: false },
        { text: "서비스가 마음에 들어요", selected: false },
        { text: "가격이 합리적이에요", selected: false },
        { text: "매장이 청결합니다", selected: false },
      ],
      surveyOptions: [],
      reviewText: '',
      shopName: '',
      paymentType: '',
      approvalNumber: '',
      purchaseDate: '',
      selectedTime: '',
    };
  },
  created() {
    console.log("created 훅 실행됨");
    this.shopName = this.$route.query.shopName || '';
    this.paymentType = this.$route.query.paymentType || '';
    this.approvalNumber = this.$route.query.approvalNumber || '';
    this.purchaseDate = this.$route.query.purchaseDate || '';
    this.shopName = this.$route.query.shopName || '';
    this.paymentType = this.$route.query.paymentType || '';
    // approvalNumber가 필요하다면, confirmReceipt에서 이를 보내는 로직 추가 필요
    // this.approvalNumber = this.$route.query.approvalNumber || ''; 
    this.purchaseDate = this.$route.query.selectedDate || '';
    this.selectedTime = this.$route.query.selectedTime || '';
    this.fetchSurveyOptions(); // fetchSurveyOptions 메서드 호출
  },
  computed: {
    currentLength() {
      return this.reviewText.length;
    }
  },
  methods: {
    async fetchSurveyOptions() {
      console.log("fetchSurveyOptions method executed");
      try {
        const response = await fetchReviewSelections(this.shopName);
        console.log("response received:", response);
        if (response && Array.isArray(response)) {
          this.surveyOptions = response.map(selection => ({
            text: selection, selected: false
          }));
          console.log("surveyOptions updated:", this.surveyOptions); // 추가된 로그
        }
        else {
          console.error('Review selections not found in the response.');
        }
      } catch (error) {
        console.error('Failed to load survey options:', error);
      }
    },
    uploadPictures(event) {
      const files = event.target.files;
      const maxFiles = 3;

      if (files.length > maxFiles) {
        alert(`최대 ${maxFiles}개까지 선택할 수 있습니다.`);
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
            this.uploadedImages.push({ preview: resizedImage });
          };
          console.log("uploadimages : " + this.uploadedImages);
        };
      }
    },
    toggleItemEs(index) {
      this.surveyEssential[index].selected = !this.surveyEssential[index].selected;
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
      const MAX_SIZE = 357.85;

      let width = img.width;
      let height = img.height;
      let ratio = 1;

      if (width > height) {
        ratio = MAX_SIZE / width;
      } else {
        ratio = MAX_SIZE / height;
      }

      width *= ratio;
      height *= ratio;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      return canvas.toDataURL('image/jpeg');
    },
    async confirmUpload() {
      try {
        // 선택된 필수 설문과 선택 설문 항목들을 필터링해서 배열로 만듭니다.
        const selectedEssentialItems = this.surveyEssential.filter(item => item.selected).map(item => item.text);
        const selectedOptionalItems = this.surveyOptions.filter(item => item.selected).map(item => item.text);

        // FormData 객체를 생성합니다.
        const formData = new FormData();

        // 리뷰 데이터를 하나의 객체로 묶습니다.
        const reviewData = {
          userNickname: this.userNickname,
          contents: this.reviewText,
          shopName: this.shopName,
          // paymentType: this.paymentType,
          paymentNum: this.approvalNumber,
          purchaseDate: this.purchaseDate,
          selectedTime: this.selectedTime,
          surveyData: {
            essential: selectedEssentialItems,
            optional: selectedOptionalItems
          }
        };

        // 리뷰 데이터를 문자열화하여 FormData에 추가합니다.
        formData.append('review', JSON.stringify(reviewData));

        this.uploadedImages.forEach((image, index) => {

          // 이미지 데이터를 File 객체로 변환
          const imageFile = new File([image.preview], `image_${index}.jpg`);

          // FormData에 File로 첨부
          formData.append('images', imageFile);
        });

        // FormData의 내용을 확인합니다.
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }

        // submitSurvey 함수를 호출하여 FormData를 전송합니다.
        const response = await submitSurvey(formData);

        console.log("Review Survey : " + response);
        alert('리뷰 설문 업로드가 성공적으로 완료되었습니다.');
      } catch (error) {
        console.error('리뷰 설문 업로드 실패:', error);
        // HTTP 응답 오류 메시지 확인
        if (error.response && error.response.data) {
          console.error('서버 오류 메시지:', error.response.data.message);
          alert(`리뷰 데이터 업로드에 실패하였습니다. 오류 메시지: ${error.response.data.message}`);
        } else {
          alert('리뷰 데이터 업로드에 실패하였습니다. 다시 시도해주세요.');
        }
      }
    },
  },
};
</script>
<style scoped>
@import "@/css/review/review.css";

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
}

.survey-option-btn {
  width: 100%;
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
</style>