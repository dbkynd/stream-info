import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import InvalidToken from '../views/InvalidToken';
import Settings from '../views/Settings.vue';
import Unauthorized from '../views/Unauthorized';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
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
