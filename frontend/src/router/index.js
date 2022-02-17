import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home';
import Unauthorized from '../views/Unauthorized';
import Logout from '../views/Logout';

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
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
