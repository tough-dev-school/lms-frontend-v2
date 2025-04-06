import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router';
import useAuth from '@/stores/auth';
import useMaterials from '@/stores/materials';
import useDiplomas from '@/stores/diplomas';
import useLoading from '@/stores/loading';

const VHomeView = () => import('@/views/VHomeView/VHomeView.vue');
const VMailSentView = () => import('@/views/VMailSentView/VMailSentView.vue');
const VSettingsView = () => import('@/views/VSettingsView/VSettingsView.vue');
const VLoginView = () => import('@/views/VLoginView/VLoginView.vue');
const VLoadingView = () => import('@/views/VLoadingView/VLoadingView.vue');
const VNotionView = () => import('@/views/VNotionView/VNotionView.vue');
const VHomeworkQuestionView = () =>
  import('@/views/VHomeworkQuestionView/VHomeworkQuestionView.vue');
const VHomeworkExpertView = () =>
  import('@/views/VHomeworkExpertView/VHomeworkExpertView.vue');
const VHomeworkAnswerView = () =>
  import('@/views/VHomeworkAnswerView/VHomeworkAnswerView.vue');
const VLoginResetView = () =>
  import('@/views/VLoginResetView/VLoginResetView.vue');
const VLoginChangeView = () =>
  import('@/views/VLoginChangeView/VLoginChangeView.vue');
const VCertificatesView = () =>
  import('@/views/VCertificatesView/VCertificatesView.vue');
const VModulesView = () => import('@/views/VModulesView/VModulesView.vue');
const VLessonsView = () => import('@/views/VLessonsView/VLessonsView.vue');
import loginByToken from '@/router/loginByToken';
import loginById from '@/router/loginById';

const isAuthorized = () => {
  const auth = useAuth();

  return !!auth.token;
};

const disallowAuthorized = () => {
  if (isAuthorized()) return { name: 'home' };
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
    path: '/:courseId/modules',
    name: 'modules',
    component: VModulesView,
  },
  {
    path: '/:courseId/module/:moduleId/lessons',
    name: 'lessons',
    component: VLessonsView,
  },
  {
    path: '/login',
    name: 'login',
    component: VLoginView,
    beforeEnter: [disallowAuthorized],
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/login/mail-sent',
    name: 'mail-sent',
    component: VMailSentView,
    beforeEnter: [disallowAuthorized],
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/login/reset',
    name: 'login-reset',
    component: VLoginResetView,
    beforeEnter: [disallowAuthorized],
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/auth/password/reset/:uid/:token/',
    name: 'login-change',
    component: VLoginChangeView,
    beforeEnter: [disallowAuthorized],
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/auth/passwordless/:passwordlessToken',
    name: 'token',
    component: VLoadingView,
    beforeEnter: [loginByToken],
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/auth/as/:userId',
    name: 'auth-as',
    component: VLoadingView,
    beforeEnter: [loginById],
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
  {
    path: '/certificates',
    name: 'certificates',
    component: VCertificatesView,
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
    // Redirect to exisiting route if route does not exist
    if (!to.name) {
      return { name: 'home' };
    }

    // Redirect to /login if unauthorized and route is not public
    if (!(isAuthorized() || to.meta.isPublic)) {
      let query = {};

      if (to.fullPath !== '/') {
        query = { ...query, next: encodeURIComponent(to.fullPath) };
      }

      return {
        name: 'login',
        query,
      };
    }

    if (to.name === 'materials' && to.params.id !== from.params.id) {
      const materials = useMaterials();
      const loading = useLoading();

      loading.isLoading = true;
      materials.material = undefined;
      await materials.getData(String(to.params.id));
      loading.isLoading = false;
    }

    if (to.name === 'certificates') {
      const diplomas = useDiplomas();

      await diplomas.getData();
    }

    // Reset title after navigation (except hash change)
    if (from.path !== to.path) document.title = 'Школа Сильных Программистов';
  },
);

export default router;
