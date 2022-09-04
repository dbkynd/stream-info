import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import '@/styles/toasts.scss';

const toastDefaultOptions = {
  pauseOnFocusLoss: false,
  position: POSITION.TOP_RIGHT,
};

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(Toast, toastDefaultOptions)
  .mount('#app');
