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
    path: '/store/detail',
    component: () => import('@/views/store/StoreDetail.vue'),
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
    component: ()=> import('@/views/store/StoreReview.vue'),
  },
  {
    path: '/store/map',
    component:()=> import('@/views/store/StoreMap.vue')
  }

  // 추가적인 라우트...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView,
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
//   },
// ];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });

// export default router;
