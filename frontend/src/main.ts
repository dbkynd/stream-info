import { createApp } from 'vue';
import Toast, { POSITION } from 'vue-toastification';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { store, key } from './store';

import 'vue-toastification/dist/index.css';
import './assets/global.css';

const toastDefaultOptions = {
  pauseOnFocusLoss: false,
  position: POSITION.BOTTOM_RIGHT,
};

createApp(App)
  .use(router)
  .use(vuetify)
  .use(store, key)
  .use(Toast, toastDefaultOptions)
  .mount('#app');
