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

const isPublicRoute = (name: string) => {
  const PUBLIC_ROUTES = ['login', 'token'];
  return PUBLIC_ROUTES.includes(String(name));
};

router.beforeEach(async (to, from, next) => {
  const auth = useAuth();

  const isAuthorized = !!auth.token;

  if (!to.name) {
    next('/profile');
  }

  if (isAuthorized || isPublicRoute(String(to.name))) {
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
