import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BackButton from './components/Backbutton.vue';

const app = createApp(App);

// Vue DevTools를 상시 활성화
app.config.devtools = true;

app.component('BackButton', BackButton).use(store).use(router).mount('#app');
