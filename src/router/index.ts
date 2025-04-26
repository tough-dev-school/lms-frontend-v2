import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router';
import useAuth from '@/stores/auth';
import useUser from '@/stores/user';

import loginByToken from '@/router/loginByToken';
import loginById from '@/router/loginById';

const fetchMainUserData = async () => {
  const user = useUser();
  await user.getData();
};

const disallowAuthorized = () => {
  const auth = useAuth();

  if (auth.token) return { name: 'home' };
};

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/VHomeView/VHomeView.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/VSettingsView/VSettingsView.vue'),
  },
  {
    path: '/:courseId/modules',
    name: 'modules',
    component: () => import('@/views/VModulesView/VModulesView.vue'),
  },
  {
    path: '/:courseId/module/:moduleId/lessons',
    name: 'lessons',
    component: () => import('@/views/VLessonsView/VLessonsView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/VLoginView/VLoginView.vue'),
    beforeEnter: [disallowAuthorized],
    meta: {
      unauthorizedOnly: true,
    },
  },
  {
    path: '/login/mail-sent',
    name: 'mail-sent',
    component: () => import('@/views/VMailSentView/VMailSentView.vue'),
    beforeEnter: [disallowAuthorized],
    meta: {
      unauthorizedOnly: true,
    },
  },
  {
    path: '/login/reset',
    name: 'login-reset',
    component: () => import('@/views/VLoginResetView/VLoginResetView.vue'),
    beforeEnter: [disallowAuthorized],
    meta: {
      unauthorizedOnly: true,
    },
  },
  {
    path: '/auth/password/reset/:uid/:token/',
    name: 'login-change',
    component: () => import('@/views/VLoginChangeView/VLoginChangeView.vue'),
    beforeEnter: [disallowAuthorized],
    meta: {
      unauthorizedOnly: true,
    },
  },
  {
    path: '/auth/passwordless/:passwordlessToken',
    name: 'token',
    component: () => import('@/views/VLoadingView/VLoadingView.vue'),
    beforeEnter: [loginByToken],
    meta: {
      unauthorizedOnly: true,
    },
  },
  {
    path: '/auth/as/:userId',
    name: 'auth-as',
    component: () => import('@/views/VLoadingView/VLoadingView.vue'),
    beforeEnter: [loginById],
  },
  {
    path: '/materials/:materialId',
    name: 'materials',
    component: () => import('@/views/VNotionView/VNotionView.vue'),
  },
  {
    path: '/homework/questions/:questionId',
    name: 'homework-question',
    component: () =>
      import('@/views/VHomeworkQuestionView/VHomeworkQuestionView.vue'),
  },
  {
    path: '/homework/question-admin/:questionId',
    name: 'homework-expert',
    component: () =>
      import('@/views/VHomeworkExpertView/VHomeworkExpertView.vue'),
  },
  {
    path: '/homework/answers/:answerId',
    name: 'homework-answer',
    component: () =>
      import('@/views/VHomeworkAnswerView/VHomeworkAnswerView.vue'),
  },
  {
    path: '/certificates',
    name: 'certificates',
    component: () => import('@/views/VCertificatesView/VCertificatesView.vue'),
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

router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const auth = useAuth();

    // Fetch main user data if token exists
    // #FIXME: this must be replaced with vue query subscriptions
    if (auth.token) {
      await fetchMainUserData();
    }

    if (to.meta.unauthorizedOnly && auth.token) {
      return { name: 'home' };
    }

    // Redirect to exisiting route if route does not exist
    if (!to.name) {
      return { name: 'home' };
    }

    // Redirect to /login if unauthorized and route is not public
    if (!(auth.token || to.meta.unauthorizedOnly)) {
      let query = {};

      if (to.fullPath !== '/') {
        query = { ...query, next: encodeURIComponent(to.fullPath) };
      }

      return {
        name: 'login',
        query,
      };
    }

    // Reset title after navigation (except hash change)
    if (from.path !== to.path) document.title = 'Школа Сильных Программистов';
  },
);

export default router;
