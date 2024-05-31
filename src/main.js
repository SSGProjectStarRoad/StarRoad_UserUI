import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BackButton from './components/Backbutton.vue';

const app = createApp(App);

// Vue DevTools를 상시 활성화
app.config.devtools = true;
console.log('Vue DevTools enabled:', app.config.devtools); // 확인용 로그

app.component('BackButton', BackButton).use(store).use(router).mount('#app');
