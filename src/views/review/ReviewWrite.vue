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
        <!-- btn에 :class를 사용하여 selected가 true일 때 'selected' 클래스가 적용되도록 함 -->
        <button class="survey-option-btn" :class="{ selected: item.selected }" @click="toggleItemEs(index)">
          {{ item.text }}
        </button>
        
      </div>

      <div class="survey-title">어떤 점이 좋았나요 ? (선택)</div>
      <div v-for="(item, index) in surveyOptions" :key="index" class="survey-item">
        <!-- btn에 :class를 사용하여 selected가 true일 때 'selected' 클래스가 적용되도록 함 -->
        <button class="survey-option-btn" :class="{ selected: item.selected }" @click="toggleItemOp(index)">
          {{ item.text }}
        </button>
        
      </div>

      <textarea class="text-review" placeholder="200자 이내로 기재해주세요." v-model="reviewText" @input="limitText"></textarea>
      <br />
      <div>
        <span style="color:#aaa;" class="counter">({{  currentLength }} / 최대 200자)</span>
      </div>
      <br />
      <div>
        <button type="button" class="btn counter register">
          <span class="label">등록하기</span>
        </button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // surveyItems 배열에 각 항목의 초기 상태를 정의
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
    }
  },
};
</script>

<style scoped>
@import "@/css/review/review.css";

.contents {
  width: 400px;
  margin: auto;
  /* padding-bottom: 120px; */
}

.write-arrow {
  transform: rotate(180deg);
}

/* 선택된 survey-item 스타일 */
.selected {
  background-color: #17F4BF;
  /* 변경될 배경 색 */
}

/* 버튼의 너비를 화면 전체 너비로 설정합니다 */
.survey-option-btn {
  width: 100%;
}
</style>
