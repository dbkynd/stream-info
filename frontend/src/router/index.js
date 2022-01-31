import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import InvalidToken from '../views/InvalidToken';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/token',
    name: 'InvalidToken',
    component: InvalidToken,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
