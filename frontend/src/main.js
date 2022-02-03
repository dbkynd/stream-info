import { createApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import sockets from '@/plugins/socket.io';

createApp(App).use(router).use(store).use(sockets).mount('#app');
