<template>
  <div class="contents">
    <div class="coupon-main">Coupon</div>
    <div class="coupon-sub">나의 쿠폰함을 확인하세요</div>

    <div class="mycoupons">
      <div class="coupons-amount">
        사용 가능 쿠폰 <span class="coupon-count">{{ coupons.length }}</span
        >장
      </div>
      <div class="coupon" v-for="coupon in coupons" :key="coupon.id">
        <div class="circle1"></div>
        <div class="coupon-img">
          <img :src="coupon.image" alt="Coupon image" />
        </div>
        <div class="line"></div>
        <div class="info">
          <div class="benefit">{{ coupon.benefit }}%</div>
          <div class="store">{{ coupon.store }}</div>
        </div>
        <div class="circle2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupons: [
        {
          id: 1,
          benefit: 10,
          store: 'Starbucks',
          image: require('@/img/reward.png'),
        },
        {
          id: 2,
          benefit: 15,
          store: 'Amazon',
          image: require('@/img/reward.png'),
        },
      ],
    };
  },
};
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
  /* overflow: hidden; */
}
.coupons-amount {
  margin-left: 10px;
  font-size: 12px;
  color: var(--dgray-color);
}
.coupon-count {
  color: var(--navy-color); /* 텍스트 색상 변경 */
  font-weight: bold; /* 텍스트 굵기 변경 */
  font-size: 16px;
}
.coupon {
  position: relative;
  display: flex;
  /* overflow: hidden; */
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
  box-shadow: inset -5px 0 5px -3px rgba(0, 0, 0, 0.4); /* 오른쪽으로만 그림자 */
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
  box-shadow: inset 5px 0 5px -3px rgba(0, 0, 0, 0.4); /* 왼쪽으로만 그림자 */
  right: 0; /* 쿠폰의 오른쪽 끝에 배치 */
  margin-right: -15px; /* 원의 절반만 보이도록 */
}
</style>
