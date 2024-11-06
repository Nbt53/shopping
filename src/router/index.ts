import { auth } from '@/configs/firebase';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';

const checkAuthState = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe immediately after getting the user state
      resolve(!!user);
    });
  });
};

const requireAuth = async (to: any, from: any, next: any) => {
  const isAuthenticated = await checkAuthState();
  if (!isAuthenticated) {
    next('/login');
  } else {
    next();
  }
};

const preventAuthAccess = async (to: any, from: any, next: any) => {
  const isAuthenticated = await checkAuthState();
  if (isAuthenticated) {
    next('/home');
  } else {
    next();
  }
};

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
    component: () => import('@/views/LogInScreen.vue'),
    beforeEnter: preventAuthAccess
  },
  {
    path: '/CreateList',
    name: 'CreateList',
    component: () => import('@/views/CreateList.vue'),
  },
  {
    path: '/list/:id',
    name: 'List',
    component: () => import('@/views/ListView.vue')

  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/HomeScreen.vue'),
  }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;


