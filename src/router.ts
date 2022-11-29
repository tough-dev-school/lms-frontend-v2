import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router';
import useAuth from '@/stores/auth';
import useUser from '@/stores/user';
import useStudies from '@/stores/studies';
const VShopView = () => import('@/views/VShopView.vue');
const VSettingsView = () => import('@/views/VSettingsView.vue');
const VLoginView = () => import('@/views/VLoginView.vue');
const VLoadingView = () => import('@/views/VLoadingView.vue');
const VNotionView = () => import('@/views/VNotionView.vue');
const VHomeworkQuestionView = () => import('@/views/VHomeworkQuestionView.vue');
const VHomeworkExpertView = () => import('@/views/VHomeworkExpertView.vue');
const VHomeworkAnswerView = () => import('@/views/VHomeworkAnswerView.vue');

const isAuthorized = () => {
  const auth = useAuth();

  return !!auth.token;
};

const isPublicRoute = (name: string) => {
  const PUBLIC_ROUTES = ['login', 'token'];
  return PUBLIC_ROUTES.includes(String(name));
};

const fetchMainUserData = async () => {
  const user = useUser();
  const studies = useStudies();
  await user.getData();
  await studies.getData();
};

export const routes = [
  {
    path: '/',
    name: 'home',
    component: VLoadingView,
    beforeEnter: async () => {
      const studies = useStudies();
      if (studies.items.length > 0) {
        const id = studies.items[0].homePageSlug;
        return { name: 'materials', params: { id } };
      } else {
        return { name: 'shop' };
      }
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: VSettingsView,
  },
  {
    path: '/login',
    name: 'login',
    component: VLoginView,
    beforeEnter: () => {
      if (isAuthorized()) {
        return { name: 'settings' };
      }
    },
  },
  {
    path: '/auth/passwordless/:passwordlessToken',
    name: 'token',
    component: VLoadingView,
    beforeEnter: async (to: RouteLocationNormalized) => {
      const auth = useAuth();
      await auth.exchangeTokens(String(to.params.passwordlessToken));
      return { name: 'settings' };
    },
  },
  {
    path: '/auth/as/:userId',
    name: 'auth-as',
    component: VLoadingView,
    beforeEnter: async (to: RouteLocationNormalized) => {
      const auth = useAuth();

      await auth.loginWithUserId(String(to.params.userId));
      return { name: 'home' };
    },
  },
  {
    path: '/shop',
    name: 'shop',
    component: VShopView,
    beforeEnter: async () => {
      const studies = useStudies();
      if (studies.items.length > 0) {
        const id = studies.items[0].homePageSlug;
        return { name: 'materials', params: { id } };
      }
    },
  },
  {
    path: '/materials/:id',
    name: 'materials',
    component: VNotionView,
  },
  {
    path: '/homework/questions/:questionId',
    name: 'homework-question',
    component: VHomeworkQuestionView,
  },
  {
    path: '/homework/question-admin/:questionId',
    name: 'homework-expert',
    component: VHomeworkExpertView,
  },
  {
    path: '/homework/answers/:answerId',
    name: 'homework-answer',
    component: VHomeworkAnswerView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to: RouteLocationNormalized) => {
  // Get main data if authorized
  if (isAuthorized()) {
    await fetchMainUserData();
  }

  // Redirect to exisiting route if route does not exist
  if (!to.name) {
    return { name: 'settings' };
  }

  // Redirect to /login if unauthorized and route is not public
  if (!(isAuthorized() || isPublicRoute(String(to.name)))) {
    return {
      name: 'login',
      query: { next: encodeURIComponent(to.fullPath) },
    };
  }
});

export default router;
