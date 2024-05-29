import { createRouter, createWebHistory } from 'vue-router';
import { RewardProcessCheck, resetStatus, rewardFinish } from '@/api/index';
import store from '@/store/index';

const routes = [
  {
    path: '/',

    redirect: '/login',
  },
  {
    path: '/main',
    component: () => import('@/views/MainView.vue'),
    meta: { auth: true },
  },
  {
    path: '/review/main',
    component: () => import('@/views/review/ReviewFollowing.vue'),
    meta: { auth: true },
  },
  {
    path: '/review/recommended',
    name: 'ReviewRecommended',
    component: () => import('@/views/review/ReviewRecommended.vue'),
    meta: { auth: true },
  },
  {
    path: '/review/write',
    component: () => import('@/views/review/ReviewWrite.vue'),
    meta: { auth: true },
  },
  {
    path: '/review/user',
    component: () => import('@/views/review/ReviewUser.vue'),
    meta: { auth: true },
  },
  {
    path: '/review/check',
    component: () => import('@/views/review/ReviewCheck.vue'),
    meta: { auth: true },
  },
  {
    path: '/review/ocr',
    component: () => import('@/views/review/OCR.vue'),
    meta: { auth: true },
  },
  {
    path: '/reward/main',
    component: () => import('@/views/reward/RewardMain.vue'),
    beforeEnter: async (to, from, next) => {
      const email = store.getters.email;
      // const userId = 1; // 사용자 ID 설정
      try {
        const response = await RewardProcessCheck(email);
        const {
          couponCount,
          reviewCount,
          usageStatus,
          issueStatus,
          rewardStatus,
        } = response.data;
        if (couponCount > 0) {
          if (usageStatus === false && issueStatus === false) {
            if (couponCount === 4) {
              if (rewardStatus === true) {
                return next('/reward/completed');
              }
              await rewardFinish(email);
              return next('/reward/getstar');
            } else {
              if (usageStatus === false && issueStatus === true) {
                return next('/reward/search');
              } else {
                return next('/reward/select');
              }
            }
          } else if (usageStatus === true && issueStatus === true) {
            await resetStatus(email);
            return next({ path: '/reward/select', query: { modal: 'true' } });
          }
        }
      } catch (error) {
        console.error('Reward Process Check Error:', error);
      }
      return next(); // 에러가 발생하거나 조건을 만족하지 않는 경우
    },
    meta: { auth: true },
  },
  {
    path: '/reward/select',
    component: () => import('@/views/reward/RewardSelect.vue'),
    meta: { auth: true },
  },
  {
    path: '/reward/mystar',
    component: () => import('@/views/reward/RewardMystar.vue'),
    meta: { auth: true },
  },
  {
    path: '/reward/search',
    component: () => import('@/views/reward/RewardSearch.vue'),
    meta: { auth: true },
  },
  {
    path: '/reward/getstar',
    component: () => import('@/views/reward/RewardGetstar.vue'),
    meta: { auth: true },
  },
  {
    path: '/reward/completed',
    component: () => import('@/views/reward/RewardCompleted.vue'),
    meta: { auth: true },
  },

  {
    path: '/store/main',
    component: () => import('@/views/store/StoreMain.vue'),
    meta: { auth: true },
  },
  {
    path: '/store/:storeId/guidemap',
    component: () => import('@/views/store/Storeguidemap.vue'),
    meta: { auth: true },
  },
  {
    path: '/store/mallmap',
    component: () => import('@/views/store/MallMap.vue'),
    meta: { auth: true },
  },
  {
    path: '/store/:storeId/reviews',
    component: () => import('@/views/store/StoreReview.vue'),
    meta: { auth: true },
  },
  {
    path: '/store/map',
    component: () => import('@/views/store/StoreMap.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/main',
    component: () => import('@/views/mypage/MypageMain.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/notice',
    component: () => import('@/views/mypage/MypageNotice.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/mycoupon',
    component: () => import('@/views/mypage/MypageCoupon.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/myreview',
    component: () => import('@/views/mypage/MypageReview.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/follow',
    component: () => import('@/views/mypage/MypageFollow.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/check',
    component: () => import('@/views/mypage/MypageCheck.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/edit',
    component: () => import('@/views/mypage/MypageEdit.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/editimg',
    component: () => import('@/views/mypage/MypageEditimg.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/withdraw',
    component: () => import('@/views/mypage/MypageWithdrawal.vue'),
    meta: { auth: true },
  },
  {
    path: '/login/register',
    component: () => import('@/views/login/RegisterUser.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginUser.vue'),
  },
  {
    path: '/login/forgotpw',
    component: () => import('@/views/login/ForgotPassword.vue'),
  },
  {
    path: '/login/email',
    component: () => import('@/views/login/EmailCode.vue'),
  },
  {
    path: '/login/newpw',
    component: () => import('@/views/login/CreatePw.vue'),
  },
  {
    path: '/login/changepw',
    component: () => import('@/views/login/ChangePw.vue'),
  },
  {
    path: '/login/oauth2/code/google',
    component: () => import('@/views/login/OAuth2Callback.vue'),
  },
  {
    path: '/login/oauth2/code/kakao',
    component: () => import('@/views/login/OAuth2Callback.vue'),
  },
  {
    path: '/login/oauth2/code/naver',
    component: () => import('@/views/login/OAuth2Callback.vue'),
  },

  // 추가적인 라우트...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다'); // auth가 true인 경우
    next('/login');
    return;
  }
  next();
});

export default router;
