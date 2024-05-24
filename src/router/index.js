import { createRouter, createWebHistory } from 'vue-router';
import { RewardProcessCheck, resetStatus, rewardFinish } from '@/api/index';
import store from '@/store/index';

const routes = [
  {
    path: '/',

    redirect: '/main',
  },
  {
    path: '/main',
    component: () => import('@/views/MainView.vue'),
    meta: { auth: true },
  },
  {
    path: '/review/main',
    component: () => import('@/views/review/ReviewFollowing.vue'),
  },
  {
    path: '/review/recommended',
    name: 'ReviewRecommended',
    component: () => import('@/views/review/ReviewRecommended.vue'),
  },
  {
    path: '/review/write',
    component: () => import('@/views/review/ReviewWrite.vue'),
  },
  {
    path: '/review/user',
    component: () => import('@/views/review/ReviewUser.vue'),
  },
  {
    path: '/review/check',
    component: () => import('@/views/review/ReviewCheck.vue'),
  },
  {
    path: '/review/ocr',
    component: () => import('@/views/review/OCR.vue'),
  },
  {
    path: '/reward/main',
    component: () => import('@/views/reward/RewardMain.vue'),
    beforeEnter: async (to, from, next) => {
      const userId = 1; // 사용자 ID 설정
      try {
        const response = await RewardProcessCheck(userId);
        const {
          couponCount,
          reviewCount,
          usageStatus,
          issueStatus,
          rewardStatus,
        } = response.data;

        if (couponCount === reviewCount) {
          if (couponCount === 3) {
            if (rewardStatus == true) {
              next('/reward/completed');
            }
            await rewardFinish(userId);
            // 리워드 지급 api 필요 (rewardFinish 하도록할것)
            next('/reward/getstar');
          } else {
            if (usageStatus === false && issueStatus === true) {
              next('/reward/search');
            } else {
              await resetStatus(userId);
              next('/reward/select');
            }
          }
        } else if (usageStatus === true && issueStatus === true) {
          next({ path: '/reward/select', query: { modal: 'true' } });
        }
      } catch (error) {
        console.error('Reward Process Check Error:', error);
        next(); // 에러가 발생하면 이동 취소
      }
    },
  },
  {
    path: '/reward/select',
    component: () => import('@/views/reward/RewardSelect.vue'),
  },
  {
    path: '/reward/mystar',
    component: () => import('@/views/reward/RewardMystar.vue'),
  },
  {
    path: '/reward/search',
    component: () => import('@/views/reward/RewardSearch.vue'),
  },
  {
    path: '/reward/getstar',
    component: () => import('@/views/reward/RewardGetstar.vue'),
  },
  {
    path: '/reward/completed',
    component: () => import('@/views/reward/RewardCompleted.vue'),
  },

  {
    path: '/store/main',
    component: () => import('@/views/store/StoreMain.vue'),
  },
  {
    path: '/store/:storeId/guidemap',
    component: () => import('@/views/store/Storeguidemap.vue'),
  },
  {
    path: '/store/mallmap',
    component: () => import('@/views/store/MallMap.vue'),
  },
  {
    path: '/store/:storeId/reviews',
    component: () => import('@/views/store/StoreReview.vue'),
  }
  ,
  {
    path: '/store/map',
    component: () => import('@/views/store/StoreMap.vue'),
  },
  {
    path: '/mypage/main',
    component: () => import('@/views/mypage/MypageMain.vue'),
    meta: { auth: true },
  },
  {
    path: '/mypage/notice',
    component: () => import('@/views/mypage/MypageNotice.vue'),
  },
  {
    path: '/mypage/mycoupon',
    component: () => import('@/views/mypage/MypageCoupon.vue'),
  },
  {
    path: '/mypage/myreview',
    component: () => import('@/views/mypage/MypageReview.vue'),
  },
  {
    path: '/mypage/follow',
    component: () => import('@/views/mypage/MypageFollow.vue'),
  },
  {
    path: '/mypage/check',
    component: () => import('@/views/mypage/MypageCheck.vue'),
  },
  {
    path: '/mypage/edit',
    component: () => import('@/views/mypage/MypageEdit.vue'),
  },
  {
    path: '/mypage/editimg',
    component: () => import('@/views/mypage/MypageEditimg.vue'),
  },
  {
    path: '/mypage/withdraw',
    component: () => import('@/views/mypage/MypageWithdrawal.vue'),
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
