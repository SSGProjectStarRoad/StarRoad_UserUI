<template>
  <div class="contents">
    <div class="coupon-main">Coupon</div>
    <div class="coupon-sub">나의 쿠폰함을 확인하세요</div>

    <div class="mycoupons">
      <div class="coupons-amount">사용 가능 쿠폰 2장</div>
      <div class="coupon">
        <div class="circle1"></div>
        <div class="coupon-img"><img src="@/img/reward.png" alt="" /></div>
        <div class="line"></div>
        <div class="info">
          <div class="benefit">10%</div>
          <div class="store">Starbucks</div>
        </div>
        <div class="circle2"></div>
      </div>
      <div class="coupon">
        <div class="circle1"></div>
        <div class="coupon-img"><img src="@/img/reward.png" alt="" /></div>
        <div class="line"></div>
        <div class="info">
          <div class="benefit">10%</div>
          <div class="store">Starbucks</div>
        </div>
        <div class="circle2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.coupon-main {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
}
.coupon-sub {
  font-size: 12px;
  color: var(--dgray-color);
  text-align: center;
  margin-top: 5px;
}
.mycoupons {
  margin: 30px 60px;
}
.coupons-amount {
  margin-left: 10px;
  font-size: 12px;
  color: var(--dgray-color);
}
.coupon {
  overflow: hidden;
  position: relative;
  display: flex;
  width: 100%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: var(--gray-color);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
.coupon-img {
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
.benefit {
  font-size: 30px;
  font-weight: 700;
}
.store {
  font-size: 14px;
}
.info {
  margin-top: 10px;
  margin-left: 10px;
}
.circle1 {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%; /* 원 형태로 만들기 */
  position: absolute;
  top: 50%; /* 부모 컨테이너 대비 수직 중앙 */
  transform: translateY(-50%); /* 정확한 중앙 정렬 */
  box-shadow: inset -3px 4px 4px -2px rgba(0, 0, 0, 0.3); /* 오른쪽으로만 그림자 */
  left: 0; /* 쿠폰의 왼쪽 끝에 배치 */
  margin-left: -15px; /* 원의 절반만 보이도록 */
}

.circle2 {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%; /* 원 형태로 만들기 */
  position: absolute;
  top: 50%; /* 부모 컨테이너 대비 수직 중앙 */
  transform: translateY(-50%); /* 정확한 중앙 정렬 */
  box-shadow: inset 3px 4px 4px -2px rgba(0, 0, 0, 0.3); /* 왼쪽으로만 그림자 */
  right: 0; /* 쿠폰의 오른쪽 끝에 배치 */
  margin-right: -15px; /* 원의 절반만 보이도록 */
}
</style>
