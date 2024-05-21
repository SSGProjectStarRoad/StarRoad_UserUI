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

// 백엔드에서 보내는 매장 목록을 받아오는 fetchStoreList 함수를 추가합니다.
async function fetchStoreList() {
  try {
    const response = await instance.get('/store/main'); // '/store/main'은 매장 목록을 받아오는 API endpoint입니다.
    return response.data; // 받아온 매장 목록을 반환합니다.
  } catch (error) {
    throw new Error('Error fetching store list: ' + error.message);
  }
}

async function selectStore(storeId, page = 0, size = 20) {
  try {
    const response = await instance.get(`/store/${storeId}/reviews?page=${page}&size=${size}`);
    if (response.status === 200) {
      const storeWithReviewData = response.data;
      console.log(storeWithReviewData);
      return storeWithReviewData;
    } else {
      throw new Error('리뷰가 있는 상점을 가져오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('오류:', error);
  }
}
async function imageUpload(imageFile) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    // axios.post 호출을 await 키워드를 사용하여 비동기 호출합니다.
    const response = await instance.post('/reviews/upload-and-ocr', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('업로드 성공:', response);
    alert('이미지 업로드 성공!');
    return response;
  } catch (error) { // try 블록 내에서 발생하는 예외를 캐치합니다.
    console.error('업로드 실패:', error);
    alert('이미지 업로드 실패');
  }
}

function getAllReview() {
  return instance.get(`/reviews`);
}

// 다른 모듈에서 접근할 수 있도록 함수들을 내보냅니다.

async function storeguide(storeId, router) {
  // 매장 ID를 서버에 전달하는 메소드입니다.
  // 여기서 HTTP 요청을 보내고 서버에서 작업을 처리할 수 있습니다.
  console.log('매장 ID:', storeId);

  try {
    // Axios를 사용하여 GET 요청을 보냅니다.
    const response = await axios.get(
      `${process.env.VUE_APP_API_URL}store/${storeId}/guidemap`,
    );

    // 서버로부터 받은 응답을 처리합니다.
    console.log('서버 응답:', response.data);

    // 받은 데이터를 필요에 따라 처리합니다.
    // 이 부분에는 받은 데이터를 저장하거나 다른 작업을 수행할 수 있습니다.

    // Vue Router를 사용하여 페이지를 이동합니다.
    router.push(`/store/${storeId}/guidemap`);
  } catch (error) {
    // 오류가 발생한 경우 처리합니다.
    console.error('오류:', error);
  }
}

async function submitSurvey(surveyData) {
  try {
    for (let pair of surveyData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    console.log("data 확인 완료");
    // axios를 사용하여 서버에 데이터를 POST 방식으로 보냅니다.
    const response = await instance.post('/reviews/submit', surveyData);

    console.log('설문 제출 성공:', response);
    alert('설문이 성공적으로 제출되었습니다!');
  } catch (error) {
    console.error('설문 제출 실패:', error);
    alert('설문 제출에 실패했습니다.');
  }
}

async function fetchReviewSelections(shopName) {
  try {
    const response = await instance.post('/review-selections/selection', {
      shopName: shopName
    });
    console.log('Review Selections:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching review selections:', error);
  }
}

//Mypage
function mypageData(userId) {
  return instance.get(`/user/mypage/${userId}`);
}
function followData(userId) {
  return instance.get(`/follow/mycount/${userId}`);
}
function myfollowingData(userId) {
  return instance.get(`/follow/from/${userId}`);
}
function myfollowerData(userId) {
  return instance.get(`/follow/to/${userId}`);
}
function deletemyfollowingData(userId, id) {
  return instance.delete(`/follow/${id}/deletefrom/${userId}`);
}
function deletemyfollowerData(userId, id) {
  return instance.delete(`/follow/${id}/deleteto/${userId}`);
}
function uploadProfileimg(userId, formData, config) {
  return instance.post(`/user/profile/upload/img/${userId}`, formData, config);
}
function readProfileimg(userId) {
  return instance.get(`/user/profile/get/img/${userId}`);
}
function deleteProfileimg(userId) {
  return instance.delete(`/user/profile/delete/img/${userId}`);
}

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
  selectStore,
  storeguide,
  mypageData,
  followData,
  myfollowingData,
  myfollowerData,
  deletemyfollowingData,
  deletemyfollowerData,
  uploadProfileimg,
  readProfileimg,
  deleteProfileimg,
  getAllReview,
  imageUpload,
  submitSurvey,
  fetchReviewSelections,
};
