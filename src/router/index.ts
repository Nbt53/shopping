import { auth } from '@/configs/firebase';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const requireAuth = (to: any, from: any, next: any) => {
  let user = auth.currentUser;
  if (!user) {
    next('/login');
  } else {
    next();
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    beforeEnter: requireAuth
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeScreen.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LogInScreen.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
