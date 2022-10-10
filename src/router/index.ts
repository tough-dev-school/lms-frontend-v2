import { createRouter, createWebHistory } from 'vue-router';
import ProfileView from '@/views/ProfileView.vue';
import LoginView from '@/views/LoginView.vue';
import useAuth from '@/stores/auth';
import NotionView from '@/views/NotionView.vue';
import useUser from '@/stores/user';

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

const fetchMainUserData = async () => {
  const user = useUser();
  await user.getUserData();
};

router.beforeEach(async (to, from, next) => {
  const auth = useAuth();

  const isAuthorized = !!auth.token;
  const isWhitelisted = ['login'].includes(String(to.name));

  if (!to.name) {
    next('/profile');
  }

  if (isAuthorized || isWhitelisted) {
    if (isAuthorized) {
      await fetchMainUserData();
      next();
    } else {
      next();
    }
  } else {
    next('/login');
  }
});

export default router;
