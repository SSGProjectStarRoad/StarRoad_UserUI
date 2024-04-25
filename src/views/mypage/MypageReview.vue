<template>
  <div class="contents">
    <div class="review-main">Review</div>
    <div class="review-sub">나의 리뷰 게시물을 확인하세요!</div>

    <div class="myreviews">
      <div class="reviews-type">최신 순</div>
      <div class="review">
        <div class="store-img"><img src="@/img/reward.png" alt="" /></div>
        <div class="line"></div>
        <div class="info">
          <div class="title">매장이름</div>
          <div class="store">좋아요 수?</div>
        </div>
      </div>
      <div class="review">
        <div class="store-img"><img src="@/img/reward.png" alt="" /></div>
        <div class="line"></div>
        <div class="info">
          <div class="title">10%</div>
          <div class="store">Starbucks</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.review-main {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
}
.review-sub {
  font-size: 12px;
  color: var(--dgray-color);
  text-align: center;
  margin-top: 5px;
}
.myreviews {
  margin: 30px 60px;
  /* overflow: hidden; */
}
.reviews-type {
  margin-left: 10px;
  font-size: 12px;
  color: var(--dgray-color);
}
.review {
  position: relative;
  display: flex;
  /* overflow: hidden; */
  width: 100%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.store-img {
  width: 110px;
  text-align: center;
  align-content: center;
}
.line {
  width: 1px;
  margin: 10px;
  background: none;
  border-left: 2px dashed #bababa; /* 점선 스타일 적용 */
}
.title {
  font-size: 20px;
  font-weight: 700;
}
.store {
  font-size: 14px;
}
.info {
  margin-top: 20px;
  margin-left: 10px;
}
</style>
