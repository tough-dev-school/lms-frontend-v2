import { createRouter, createWebHistory } from 'vue-router';
import ProfileView from '@/views/ProfileView.vue';
import LoginView from '@/views/LoginView.vue';
import useAuth from '@/stores/auth';
import NotionView from '@/views/NotionView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/materials/:id',
      name: 'materials',
      component: NotionView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuth();

  const isAuthorized = !!auth.token;
  const isWhitelisted = ['login'].includes(String(to.name));

  if (isAuthorized || isWhitelisted) {
    next();
  } else {
    next('/login');
  }
});

export default router;
