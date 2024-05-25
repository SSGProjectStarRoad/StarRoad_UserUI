import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BackButton from './components/Backbutton.vue';

const app = createApp(App);

// 프로덕션 환경에서 Vue DevTools를 활성화
if (process.env.VUE_APP_ENABLE_DEVTOOLS === 'true') {
  app.config.devtools = true;
}

app.component('BackButton', BackButton).use(store).use(router).mount('#app');
