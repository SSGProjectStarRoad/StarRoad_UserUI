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
      <div class="Me4yK">
        <a href="#" target="_self" role="button" class="T00ux" aria-pressed="false">
          <span>
            재방문하고 싶어요
          </span>
        </a>
      </div>
      <div class="Me4yK">
        <a href="#" target="_self" role="button" class="T00ux" aria-pressed="false">
          <span>
            직원의 서비스가 마음에 들어요
          </span>
        </a>
      </div>
      <div class="Me4yK">
        <a href="#" target="_self" role="button" class="T00ux" aria-pressed="false">
          <span>
            가격이 합리적이에요
          </span>
        </a>
      </div>

      <div class="survey-title">어떤 점이 좋았나요 ? (선택)</div>
      <div class="Me4yK">
        <a href="#" target="_self" role="button" class="T00ux" aria-pressed="false">
          <span>
            음식이 맛있어요
          </span>
        </a>
      </div>
      <div class="Me4yK">
        <a href="#" target="_self" role="button" class="T00ux" aria-pressed="false">
          <span>
            음식이 빨리 나와요
          </span>
        </a>
      </div>
      <div class="Me4yK">
        <a href="#" target="_self" role="button" class="T00ux" aria-pressed="false">
          <span>
            재료가 신선해요
          </span>
        </a>
      </div>

      <textarea class="text-review" placeholder="200자 이내로 기재해주세요.">
      </textarea>
      <br />
      <div>
        <span style="color:#aaa;" class="counter">(0 / 최대 200자)</span>
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
  components: {
  }
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
</style>
