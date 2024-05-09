import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}
const instance = createInstance();

function rewardStart(userId) {
  console.log('Base URL:', process.env.VUE_APP_API_URL);
  console.log('Request URL:', `/reward-process/${userId}/start`);

  return instance.get(`/reward-process/${userId}/start`);
}
function issueCouponAPI(userId, couponId) {
  console.log('Attempting to issue coupon:', { userId, couponId }); // 로그 추가
  return instance.post(`/coupon/issue`, {
    userId,
    couponId,
  });
}
function myCouponList(userId) {
  return instance.get(`/coupon/${userId}/coupon/list`);
}

function CouponUse(couponHistoryId) {
  return instance.get(`/coupon-history/${couponHistoryId}/use`);
}

export { rewardStart, issueCouponAPI, myCouponList, CouponUse };
