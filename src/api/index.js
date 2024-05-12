// HTTP 요청을 보내기 위해 'axios' 라이브러리를 가져옵니다.
import axios from 'axios';

// './common/interceptors' 모듈에서 'setInterceptors' 함수를 가져옵니다.
import { setInterceptors } from './common/interceptors';

// Axios 인스턴스를 만드는 함수입니다. baseURL과 인터셉터를 설정합니다.
function createInstance() {
  // 환경 변수에서 가져온 기본 URL을 사용하여 Axios 인스턴스를 생성합니다.
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // 인스턴스의 기본 URL을 설정합니다.
  });

  // 인터셉터를 인스턴스에 적용합니다.
  return setInterceptors(instance);
}

// 인터셉터가 적용된 Axios 인스턴스를 생성합니다.
const instance = createInstance();

// Reward API
// 특정 사용자의 보상 프로세스를 시작하는 함수입니다.
function rewardStart(userId) {
  // 환경 변수에서 가져온 기본 URL을 로깅합니다.
  console.log('Base URL:', process.env.VUE_APP_API_URL);

  // 특정 사용자의 보상 프로세스를 시작하는 요청 URL을 로깅합니다.
  console.log('Request URL:', `/reward-process/${userId}/start`);

  // 사용자의 보상 프로세스를 시작하기 위해 GET 요청을 보냅니다.
  return instance.get(`/reward-process/${userId}/start`);
}

function issueCouponAPI(userId, couponId) {
  // 특정 사용자와 쿠폰 ID에 대한 쿠폰 발급 시도를 로깅합니다.
  console.log('Attempting to issue coupon:', { userId, couponId });

  // 사용자에게 쿠폰을 발급하기 위해 POST 요청을 보냅니다.
  return instance.post(`/coupon/issue`, {
    userId,
    couponId,
  });
}

// 사용자의 쿠폰 목록을 검색하는 함수입니다.
function myCouponList(userId) {
  // 사용자의 쿠폰 목록을 검색하기 위해 GET 요청을 보냅니다.
  return instance.get(`/coupon/${userId}/coupon/list`);
}

// 쿠폰을 사용 처리하는 함수입니다.
function CouponUse(couponHistoryId) {
  // 쿠폰을 사용 처리하기 위해 GET 요청을 보냅니다. 쿠폰의 이력 ID를 기준으로 합니다.
  return instance.get(`/coupon-history/${couponHistoryId}/use`);
}


function RewardProcessCheck(userId) {
  return instance.get(`/reward-process/${userId}/get`);
}

function ReviewCount(userId) {
  return instance.patch(`/reward-process/${userId}/review`);
}

function resetStatus(userId) {
  return instance.patch(`/reward-process/${userId}/new`);
}
function rewardFinish(userId) {
  return instance.patch(`/reward-process/${userId}/completed`);
}
function rewardList(userId) {
  return instance.get(`/reward-history/user/${userId}/list`);
}
function rewardAdd(userId) {
  const today = new Date().getMonth() + 1;
  return instance.post(`/rewards/obtain`, {
    member_id: userId,
    reward_id: today,
  });
}
// EOF REWARD
>>>>>>> 2131791ac74cd0bb5347a8a38e4338ace87b83d3

// 백엔드에서 보내는 매장 목록을 받아오는 fetchStoreList 함수를 추가합니다.
async function fetchStoreList() {
  try {
    const response = await instance.get('/store/main'); // '/store/main'은 매장 목록을 받아오는 API endpoint입니다.
    return response.data; // 받아온 매장 목록을 반환합니다.
  } catch (error) {
    throw new Error('Error fetching store list: ' + error.message);
  }
}


async function selectStore(storeid) {
  try {
    // 주어진 storeid를 사용하여 API 엔드포인트로 GET 요청을 보냅니다.
    const response = await instance.get(`/store/${storeid}/reviews`);
 
    // 응답 상태가 200 (OK)인지 확인합니다.
    if (response.status === 200) {
      // 응답이 성공적이면 응답에서 데이터를 추출합니다.
      const storeWithReviewData = response.data;
 
      // 받은 데이터를 필요에 따라 처리합니다.
      console.log(storeWithReviewData);
      // 데이터를 사용하여 UI를 업데이트하거나 다른 작업을 수행할 수 있습니다.
 
      // 필요한 경우 데이터를 반환합니다.
      return storeWithReviewData;
    } else {
      // 응답 상태가 200이 아닌 경우 오류를 발생시킵니다.
      throw new Error('리뷰가 있는 상점을 가져오는데 실패했습니다.');
    }
  } catch (error) {
    // API 요청 중 발생한 오류를 처리합니다.
    console.error('오류:', error);
    // 사용자에게 오류 메시지를 표시하거나 오류를 적절하게 처리할 수 있습니다.
  }
 }

// 다른 모듈에서 접근할 수 있도록 함수들을 내보냅니다.
export { rewardStart, issueCouponAPI, myCouponList, CouponUse, fetchStoreList ,selectStore };

export {
  rewardStart,
  issueCouponAPI,
  myCouponList,
  CouponUse,
  RewardProcessCheck,
  ReviewCount,
  resetStatus,
  rewardFinish,
  rewardList,
  rewardAdd,
  fetchStoreList,
};

