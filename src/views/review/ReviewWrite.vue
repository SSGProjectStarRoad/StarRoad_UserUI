<template>
  <div class="contents">
<div class="timeline-post-item">
  <div class="timeline-post-content">
    <div class="restaurant-info">
      <img class="write-arrow" src="../../img/review/arrow_left_black.svg" alt="" style="
            background: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
              center center no-repeat transparent;" />
      <div class="__info">
        <h4 class="__name"><span>톤쇼우 광안점</span></h4>
        <div class="__meta"> 2024. 04. 25. (목) </div>
      </div>
    </div>
  </div>
</div>

<div class="survey">
  <div class="survey-title">어떤 점이 좋았나요 ? (필수)</div>
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
    <br/>
    <br/>
    <br/>
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
    <button type="button" class="btn counter register">
      <span class="">등록하기</span>
    </button>
  </div>

</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadedImages: [],
      surveyEssential: [
        { text: "재방문하고 싶어요", selected: false },
        { text: "직원의 서비스가 마음에 들어요", selected: false },
        { text: "가격이 합리적이에요", selected: false },
      ],
      surveyOptions: [
        { text: "음식이 맛있어요", selected: false },
        { text: "음식이 빨리 나와요", selected: false },
        { text: "재료가 신선해요", selected: false },
      ],
      reviewText: ''
    };
  },
  computed: {
    currentLength() {
      return this.reviewText.length;
    }
  },
  methods: {
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

              // 이미지를 서버로 전송하는 대체 코드
            // axios.post('/uploadImage', { image: reader.result })
            //   .then(response => {
            //     console.log('이미지가 성공적으로 서버로 전송되었습니다:', response);
            //   })
            //   .catch(error => {
            //     console.error('이미지 전송에 실패했습니다:', error);
            //   });
            
            // 여기서는 이미지를 로컬로 저장하도록 임시로 설정
            const resizedImage = this.resizeImage(img);
            this.uploadedImages.push({ preview: resizedImage });
          };
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
        this.reviewText = this.reviewText.slice(0,200);
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
    }
  },
};
</script>
<style scoped>
@import "@/css/review/review.css";

.newPicture{
  margin:5px;
  margin-left:20px;
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
.uploaded-image-preview{
  border-radius: 10px;
}
</style>