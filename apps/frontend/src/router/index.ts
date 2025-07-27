import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { loginByToken } from '@/router/loginByToken';
import { loginById } from '@/router/loginById';
import { useQueryClient } from '@tanstack/vue-query';
import { baseQueryKey, fetchHomeworkAnswer } from '@/query';
import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';

export enum AllowMeta {
  Authorized = 'authorized',
  Unauthorized = 'unauthorized',
  Everyone = 'everyone',
}

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/VCoursesView/VCoursesView.vue'),
    meta: {
      allow: AllowMeta.Authorized,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/VSettingsView/VSettingsView.vue'),
    meta: {
      allow: AllowMeta.Authorized,
    },
  },
  {
    path: '/:courseId/modules',
    name: 'modules',
    component: () => import('@/views/VModulesView/VModulesView.vue'),
    props: (route: RouteLocationNormalized) => ({
      courseId: Number.parseInt(route.params.courseId as string),
    }),
    meta: {
      allow: AllowMeta.Authorized,
    },
  },
  {
    path: '/:courseId/module/:moduleId/lessons',
    name: 'lessons',
    component: () => import('@/views/VLessonsView/VLessonsView.vue'),
    props: (route: RouteLocationNormalized) => ({
      courseId: Number.parseInt(route.params.courseId as string),
      moduleId: Number.parseInt(route.params.moduleId as string),
    }),
    meta: {
      allow: AllowMeta.Authorized,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/VLoginView/VLoginView.vue'),
    meta: {
      allow: AllowMeta.Unauthorized,
    },
  },
  {
    path: '/login/mail-sent',
    name: 'mail-sent',
    component: () => import('@/views/VMailSentView/VMailSentView.vue'),
    props: (route: RouteLocationNormalized) => ({
      email: route.query.email as string | undefined,
    }),
    meta: {
      allow: AllowMeta.Unauthorized,
    },
  },
  {
    path: '/login/reset',
    name: 'login-reset',
    component: () => import('@/views/VLoginResetView/VLoginResetView.vue'),
    meta: {
      allow: AllowMeta.Unauthorized,
    },
  },
  {
    path: '/auth/password/reset/:uid/:token/',
    name: 'login-change',
    component: () => import('@/views/VLoginChangeView/VLoginChangeView.vue'),
    props: (route: RouteLocationNormalized) => ({
      uid: route.params.uid as string,
      token: route.params.token as string,
    }),
    meta: {
      allow: AllowMeta.Unauthorized,
    },
  },
  {
    path: '/auth/passwordless/:passwordlessToken',
    name: 'token',
    component: () => import('@/views/VLoadingView/VLoadingView.vue'),
    beforeEnter: [loginByToken],
    meta: {
      allow: AllowMeta.Unauthorized,
    },
  },
  {
    path: '/auth/as/:userId',
    name: 'auth-as',
    component: () => import('@/views/VLoadingView/VLoadingView.vue'),
    beforeEnter: [loginById],
    meta: {
      allow: AllowMeta.Everyone,
    },
  },
  {
    path: '/materials/:materialId',
    name: 'materials',
    component: () => import('@/views/VNotionView/VNotionView.vue'),
    props: (route: RouteLocationNormalized) => ({
      materialId: route.params.materialId as string,
    }),
    meta: {
      allow: AllowMeta.Authorized,
    },
  },
  {
    path: '/homework/:questionId',
    name: 'homework',
    component: () => import('@/views/VHomeworkView/VHomeworkView.vue'),
    props: (route: RouteLocationNormalized) => ({
      questionId: route.params.questionId as string,
      answerId: route.query.answerId as string | undefined,
    }),
    meta: {
      allow: AllowMeta.Authorized,
    },
  },
  {
    path: '/homework/answers/:answerId/',
    name: 'homework-answer-old',
    beforeEnter: [
      async (to: RouteLocationNormalized) => {
        const queryClient = useQueryClient();
        const answerId = to.params.answerId as string;
        const answer = await fetchHomeworkAnswer(queryClient, { answerId });
        return {
          name: 'homework',
          params: { questionId: answer.question },
          query: { answerId },
        };
      },
    ],
    component: () => import('@/views/VLoadingView/VLoadingView.vue'),
    meta: {
      allow: AllowMeta.Authorized,
    },
  },
  {
    path: '/homework/questions/:questionId',
    name: 'homework-question-old',
    component: VLoadingView,
    beforeEnter: [
      (to: RouteLocationNormalized) => {
        return {
          name: 'homework',
          params: { questionId: to.params.questionId },
        };
      },
    ],
    meta: {
      allow: AllowMeta.Authorized,
    },
  },
  {
    path: '/homework/question-admin/:questionId',
    component: VLoadingView,
    name: 'homework-question-admin-old',
    beforeEnter: [
      (to: RouteLocationNormalized) => {
        return {
          name: 'homework',
          params: { questionId: to.params.questionId },
        };
      },
    ],
    meta: {
      allow: AllowMeta.Authorized,
    },
  },
  {
    path: '/certificates',
    name: 'certificates',
    component: () => import('@/views/VCertificatesView/VCertificatesView.vue'),
    meta: {
      allow: AllowMeta.Authorized,
    },
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
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // Reset title after navigation (except hash change)
    if (from.path !== to.path) {
      document.title = 'Школа Сильных Программистов';
    }

    const { token } = useAuth();

    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: baseQueryKey() });

    // Redirect to existing route if route does not exist
    if (!to.name) {
      return { name: 'home' };
    }

    // Check authentication
    if (token.value) {
      // Redirect authorized users away from auth routes
      if (to.meta.allow === AllowMeta.Unauthorized) {
        return { name: 'home' };
      }
    } else {
      // Allow access to routes that don't require auth
      if (
        [AllowMeta.Unauthorized, AllowMeta.Everyone].includes(
          to.meta.allow as AllowMeta,
        )
      ) {
        return;
      }

      // Block access to protected routes
      if (to.meta.allow === AllowMeta.Authorized) {
        return {
          name: 'login',
          query: { redirectTo: encodeURIComponent(to.fullPath) },
        };
      }
    }
  },
);

export default router;
