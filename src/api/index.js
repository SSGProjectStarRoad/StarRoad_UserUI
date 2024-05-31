// HTTP 요청을 보내기 위해 'axios' 라이브러리를 가져옵니다.
import axios from 'axios';
// import store from '@/store/index';

// './common/interceptors' 모듈에서 'setInterceptors' 함수를 가져옵니다.
import { setInterceptors } from './common/interceptors';

// Axios 인스턴스를 만드는 함수입니다. baseURL과 인터셉터를 설정합니다.
function createInstance() {
  // 환경 변수에서 가져온 기본 URL을 사용하여 Axios 인스턴스를 생성합니다.
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // 인스턴스의 기본 URL을 설정합니다.
    withCredentials: true,
  });
  // 인터셉터를 인스턴스에 적용합니다.
  return setInterceptors(instance);
}

// 인터셉터가 적용된 Axios 인스턴스를 생성합니다.
const instance = createInstance();

// Reward API
// 특정 사용자의 보상 프로세스를 시작하는 함수입니다.
function rewardStart(email) {
  // 환경 변수에서 가져온 기본 URL을 로깅합니다.
  console.log('Base URL:', process.env.VUE_APP_API_URL);

  // 특정 사용자의 보상 프로세스를 시작하는 요청 URL을 로깅합니다.
  console.log('Request URL:', `/reward-process/${email}/start`);

  // 사용자의 보상 프로세스를 시작하기 위해 GET 요청을 보냅니다.
  return instance.get(`/reward-process/${email}/start`);
}

function issueCouponAPI(email, couponId) {
  // 특정 사용자와 쿠폰 ID에 대한 쿠폰 발급 시도를 로깅합니다.
  console.log('Attempting to issue coupon:', { email, couponId });

  // 사용자에게 쿠폰을 발급하기 위해 POST 요청을 보냅니다.
  return instance.post(`/coupon/issue`, {
    email,
    couponId,
  });
}

// 사용자의 쿠폰 목록을 검색하는 함수입니다.
function myCouponList(email) {
  // 사용자의 쿠폰 목록을 검색하기 위해 GET 요청을 보냅니다.
  return instance.get(`/coupon/${email}/coupon/list`);
}

// 쿠폰을 사용 처리하는 함수입니다.
function CouponUse(couponHistoryId) {
  // 쿠폰을 사용 처리하기 위해 GET 요청을 보냅니다. 쿠폰의 이력 ID를 기준으로 합니다.
  return instance.get(`/coupon-history/${couponHistoryId}/use`);
}

function RewardProcessCheck(email) {
  return instance.get(`/reward-process/${email}/get`);
}

function ReviewCount(email) {
  return instance.patch(`/reward-process/${email}/review`);
}

function resetStatus(email) {
  return instance.patch(`/reward-process/${email}/new`);
}
function rewardFinish(email) {
  return instance.patch(`/reward-process/${email}/completed`);
}
function rewardList(email) {
  return instance.get(`/reward-history/user/${email}/list`);
}
function rewardAdd(email) {
  const today = new Date().getMonth() + 1;
  return instance.post(`/rewards/obtain`, {
    member_email: email,
    reward_id: today,
  });
}
// axios 인스턴스가 'instance'로 정의되어 있다고 가정합니다.
function getStoreKeywords(storeId) {
  return instance.get(`/store/${storeId}/keywords`);
}

function likeReview(reviewId, userId) {
  return instance.post(`/review-likes/${reviewId}/${userId}`);
}

async function addFollowUser(userName, userEmail) {
  console.log('username : ' + userName);
  try {
    const response = await instance.post(
      `/reviews/addFollowUser?userName=${encodeURIComponent(
        userName,
      )}&userEmail=${encodeURIComponent(userEmail)}`,
    );

    if (response.status === 200) {
      console.log(response);
      return response;
    } else {
      throw new Error('팔로우하는데 실패했습니다.');
    }
  } catch (error) {
    console.error('오류:', error);
  }
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
async function selectStore(
  storeId,
  userEmail,
  page = 0,
  size = 10,
  filter = '',
  sort,
  keyword = '',
) {
  try {
    const response = await instance.get(`/store/${storeId}/reviews`, {
      params: { userEmail, page, size, filter, sort, keyword },
    });
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

// 다른 모듈에서 접근할 수 있도록 함수들을 내보냅니다.

// 로그인 API
function loginUser(userData) {
  return instance.post('/user/login', userData);
}
// 회원가입 API
function registerUser(userData) {
  return instance.post('/user/join', userData);
}
// 닉네임 중복 검사 API
function checkNicknameDuplicate(nickname) {
  return instance.post('/user/join/nickname-check', { nickname });
}
// 이메일 중복 검사 API
function checkEmailDuplicate(email) {
  return instance.post('/user/join/email-check', { email });
}
// 이메일 인증 코드 전송 API
function sendAuthCode(email) {
  return instance.post('/auth/send-code', { email });
}
// 이메일 인증 코드 검증 API
function verifyAuthCode(email, code) {
  return instance.post('/auth/verify-code', { email, code });
}
// 비밀번호 업데이트 API
function updatePassword(email, newPassword) {
  return instance.post('/user/update-password', {
    email: email,
    newPassword: newPassword,
  });
}
// OAuth2 로그인 API
function loginWithOAuth2(provider, code) {
  return instance.post(`/oauth2/${provider}`, { code });
}
// 사용자 정보를 가져오는 API
function fetchUserData(email) {
  return instance.post('/user/details', { email });
}
// 사용자 프로필 업데이트 API
function updateUserProfile(profileData) {
  return instance.post('/user/update-profile', profileData);
}
// 액세스 토큰을 새로 발급받는 API
function getNewAccessToken(refreshToken) {
  return instance.post('/api/token/access-token', { refreshToken });
}
// 로그아웃 API
function logoutUser(logoutData) {
  return instance.post('/user/logout', logoutData, {
    headers: {
      Authorization: `Bearer ${logoutData.accessToken}`,
    },
  });
}
// 사용자 비활성화 API
function inactiveUser(email) {
  return instance.post('/user/inactive', { email });
}

async function getAllReview(userEmail, page = 0, size = 10) {
  try {
    const response = await instance.get(`/reviews`, {
      params: { userEmail, page, size },
    });
    if (response.status === 200) {
      const ReviewData = response.data;
      console.log("getAllReivew : " + JSON.stringify(ReviewData));
      return ReviewData;
    } else {
      throw new Error('리뷰를 가져오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('오류:', error);
  }
}

async function getFollowingReview(userEmail, page = 0, size = 10) {
  try {
    const response = await instance.get(`/reviews/following`, {
      params: { userEmail, page, size },
    });
    if (response.status === 200) {
      const ReviewData = response.data;
      console.log(ReviewData);
      return ReviewData;
    } else {
      throw new Error('리뷰를 가져오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('오류:', error);
  }
}
async function getMyReview(email, page = 0, size = 10) {
  try {
    const response = await instance.get(`/reviews/myreveiw`, {
      params: { email, page, size },
    });
    if (response.status === 200) {
      const ReviewData = response.data;
      console.log(ReviewData);
      return ReviewData;
    } else {
      throw new Error('리뷰를 가져오는데 실패했습니다.');
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
    console.log('index.js function(imageUpload) : 업로드 성공 : ', response);
    return response;
  } catch (error) {
    // try 블록 내에서 발생하는 예외를 캐치합니다.
    console.error('index.js function(imageUpload) : 업로드 실패 : ', error);
  }
}

// 다른 모듈에서 접근할 수 있도록 함수들을 내보냅니다.

async function storeguide(storeId, router) {
  // 매장 ID를 서버에 전달하는 메소드입니다.
  // 여기서 HTTP 요청을 보내고 서버에서 작업을 처리할 수 있습니다.
  console.log('매장 ID:', storeId);
  try {
    // Axios를 사용하여 GET 요청을 보냅니다.
    const response = await instance.get(`/store/${storeId}/guidemap`);
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
    console.log('data 확인 완료');
    // axios를 사용하여 서버에 데이터를 POST 방식으로 보냅니다.
    const response = await instance.post('/reviews/submit', surveyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('설문 제출 성공:', response);
    alert('설문이 성공적으로 제출되었습니다!');
  } catch (error) {
    console.error('설문 제출 실패:', error);
    alert('설문 제출에 실패했습니다.');
  }
}

async function fetchRankUser(userEmail) {
  try {
    const response = await instance.get(`/reviews/rank`, {
      params: { userEmail },
    });

    if (response.status === 200) {
      const RankData = response.data;
      console.log(RankData);
      return RankData;
    } else {
      throw new Error('랭킹 유저를 가져오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('오류:', error);
  }
}

async function fetchAllUser(userEmail) {
  try {
    const response = await instance.get(`/reviews/allUser`, {
      params: { userEmail },
    });

    if (response.status === 200) {
      const allUser = response.data;
      console.log("fetchAllUser : " + allUser);
      return allUser;
    } else {
      throw new Error('랭킹 유저를 가져오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('오류:', error);
  }
}

async function fetchReviewSelections(shopName) {
  try {
    const response = await instance.post('/review-selections/selection', {
      shopName: shopName,
    });
    console.log('Review Selections:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching review selections:', error);
  }
}

//Mypage
function mypageData(email) {
  return instance.get(`/user/mypage/${email}`);
}
function followData(email) {
  return instance.get(`/follow/mycount/${email}`);
}
function myfollowingData(email) {
  return instance.get(`/follow/from/${email}`);
}
function myfollowerData(email) {
  return instance.get(`/follow/to/${email}`);
}
function deletemyfollowingData(email, id) {
  return instance.delete(`/follow/${id}/deletefrom/${email}`);
}
function deletemyfollowerData(email, id) {
  return instance.delete(`/follow/${id}/deleteto/${email}`);
}
function uploadProfileimg(email, formData, config) {
  return instance.post(`/user/profile/upload/img/${email}`, formData, config);
}
function readProfileimg(email) {
  return instance.get(`/user/profile/get/img/${email}`);
}
function deleteProfileimg(email) {
  return instance.delete(`/user/profile/delete/img/${email}`);
}
function getEventList() {
  return instance.get(`/board/list`);
}
function getEventDetail(boardId) {
  return instance.get(`/board-image/content/${boardId}`);
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
  loginUser,
  registerUser,
  checkNicknameDuplicate,
  checkEmailDuplicate,
  sendAuthCode,
  verifyAuthCode,
  updatePassword,
  loginWithOAuth2,
  fetchUserData,
  updateUserProfile,
  getNewAccessToken,
  logoutUser,
  inactiveUser,
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
  likeReview,
  submitSurvey,
  fetchReviewSelections,
  getFollowingReview,
  getEventList,
  getEventDetail,
  fetchRankUser,
  addFollowUser,
  getMyReview,
  fetchAllUser,
  getStoreKeywords,
};
