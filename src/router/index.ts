import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router';
import useAuth from '@/stores/auth';
import useUser from '@/stores/user';
import useStudies from '@/stores/studies';
import useMaterials from '@/stores/materials';
import useDiplomas from '@/stores/diplomas';
import useLoading from '@/stores/loading';
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
const VCertificatesView = () => import('@/views/VCertificatesView.vue');
import loginByToken from '@/router/loginByToken';
import loginById from '@/router/loginById';

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
