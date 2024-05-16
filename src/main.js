import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BackButton from './components/Backbutton.vue';

createApp(App)
  .component('BackButton', BackButton)
  .use(store)
  .use(router)
  .mount('#app');
