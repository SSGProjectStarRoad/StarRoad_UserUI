<template>
  <div class="contents">
    <div class="coupon-main">Coupon</div>
    <div class="coupon-sub">나의 쿠폰함을 확인하세요</div>

    <div class="mycoupons">
      <div class="coupons-amount">
        사용 가능 쿠폰
        <span class="coupon-count">{{ availableCouponsCount }}</span
        >장
      </div>
      <form action="">
        <div
          class="coupon"
          v-for="coupon in coupons"
          :key="coupon.coupon_id"
          :class="{ 'semi-transparent': coupon.coupon_usage_status }"
        >
          <div class="circle1"></div>
          <div class="coupon-img">
            <img :src="coupon.image" alt="Coupon image" />
          </div>
          <div class="line"></div>
          <div class="info">
            <div class="benefit">{{ coupon.coupon_discount_rate }}%</div>
            <div class="store">{{ coupon.coupon_store_type }}</div>
            <div class="store">{{ coupon.coupon_expired_at }}</div>
          </div>
          <button
            class="use-coupon"
            v-if="!coupon.coupon_usage_status"
            @click="myCouponUse(coupon.coupon_history_id)"
          >
            사용
          </button>
          <div class="circle2"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { myCouponList, CouponUse } from '@/api/index';
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      coupons: [],
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
    availableCouponsCount() {
      return this.coupons.filter(coupon => !coupon.coupon_usage_status).length;
    },
  },
  methods: {
    async myCouponList() {
      try {
        // const userId = 1; // 실제 사용자 ID로 대체

        const response = await myCouponList(this.email);
        console.log('API response:', response);
        this.coupons = response.data.map((coupon, index) => ({
          ...coupon,
          image: this.getImagePath(coupon.coupon_id - 1), // 이미지 경로 설정
        }));
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    },
    getImagePath(index) {
      return require(`@/img/reward/category/category${index + 1}.png`);
    },
    async myCouponUse(couponHistoryId) {
      try {
        const response = await CouponUse(couponHistoryId);
        console.log('Coupon used response:', response);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    },
  },
  mounted() {
    this.myCouponList(); // API 호출
  },
};
</script>

<style scoped>
.semi-transparent {
  opacity: 0.5; /* 반투명 효과 */
}
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
  width: 70px;
  align-content: center;
}
.coupon-img img {
  padding-left: 20px;
  width: 70%;
  height: auto;
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
.use-coupon {
  position: absolute;
  top: 30px;
  width: 60px;
  height: 40px;
  right: 30px;
  border-radius: 8px;
  background-color: var(--navy-color);
  color: white;
  border: 0;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.2);
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
