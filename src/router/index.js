import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',

    redirect: '/main',
  },
  {
    path: '/main',
    component: () => import('@/views/MainView.vue'),
  },
  {
    path: '/review/main',
    component: () => import('@/views/review/ReviewFollowing.vue'),
  },
  {
    path: '/reward/main',
    component: () => import('@/views/reward/RewardMain.vue'),
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
    path: '/reward/completed',
    component: () => import('@/views/reward/RewardCompleted.vue'),
  },
  {
    path: '/store/main',
    component: () => import('@/views/store/StoreMain.vue'),
  },
  {
    path: '/store/come',
    component: () => import('@/views/store/StoreCome.vue'),
  },
  {
    path: '/store/mallmap',
    component: () => import('@/views/store/MallMap.vue'),
  },
  {
    path: '/store/review',
    component: () => import('@/views/store/StoreReview.vue'),
  },
  {
    path: '/store/map',
    component: () => import('@/views/store/StoreMap.vue'),
  },

  // 추가적인 라우트...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
