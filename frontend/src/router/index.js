import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home';
import Unauthorized from '../views/Unauthorized';
import Logout from '../views/Logout';
import NotFound from '../views/NotFound';
import SusTerms from '../views/SusTerms';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/terms',
    name: 'SusTerms',
    component: SusTerms,
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
