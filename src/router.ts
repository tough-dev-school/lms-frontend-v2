import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router';
import useAuth from '@/stores/auth';
import useUser from '@/stores/user';
import useStudies from '@/stores/studies';
const VHomeView = () => import('@/views/VHomeView.vue');
const VMailSentView = () => import('@/views/VMailSentView.vue');
const VSettingsView = () => import('@/views/VSettingsView.vue');
const VLoginView = () => import('@/views/VLoginView.vue');
const VLoadingView = () => import('@/views/VLoadingView.vue');
const VNotionView = () => import('@/views/VNotionView.vue');
const VHomeworkQuestionView = () => import('@/views/VHomeworkQuestionView.vue');
const VHomeworkExpertView = () => import('@/views/VHomeworkExpertView.vue');
const VHomeworkAnswerView = () => import('@/views/VHomeworkAnswerView.vue');
const VLoginResetView = () => import('@/views/VLoginResetView.vue');
const VLoginChangeView = () => import('@/views/VLoginChangeView.vue');

const isAuthorized = () => {
  const auth = useAuth();

  return !!auth.token;
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
    component: VHomeView,
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
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/login/mail-sent',
    name: 'mail-sent',
    component: VMailSentView,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/login/reset',
    name: 'login-reset',
    component: VLoginResetView,
    beforeEnter: () => {
      if (isAuthorized()) {
        return { name: 'settings' };
      }
    },
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/auth/password/reset/:uid/:token/',
    name: 'login-change',
    component: VLoginChangeView,
    beforeEnter: () => {
      if (isAuthorized()) {
        return { name: 'settings' };
      }
    },
    meta: {
      isPublic: true,
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
    meta: {
      isPublic: true,
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
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 32 };
    }
  },
});

router.beforeEach(async (to: RouteLocationNormalized) => {
  // Get main data if authorized
  if (isAuthorized()) {
    await fetchMainUserData();
  }

  // Redirect to exisiting route if route does not exist
  if (!to.name) {
    return { name: 'home' };
  }

  // Redirect to /login if unauthorized and route is not public
  if (!(isAuthorized() || to.meta.isPublic)) {
    return {
      name: 'login',
      query: { next: encodeURIComponent(to.fullPath) },
    };
  }
});

export default router;
