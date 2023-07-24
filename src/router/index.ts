import useAuth from '@/stores/auth';
import useDiplomas from '@/stores/diplomas';
import useLoading from '@/stores/loading';
import useMaterials from '@/stores/materials';
import useStudies from '@/stores/studies';
import useUser from '@/stores/user';
import {
  type RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from 'vue-router';

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
import loginById from '@/router/loginById';
import loginByToken from '@/router/loginByToken';

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
    component: VHomeView,
    name: 'home',
    path: '/',
  },
  {
    component: VSettingsView,
    name: 'settings',
    path: '/settings',
  },
  {
    beforeEnter: [disallowAuthorized],
    component: VLoginView,
    meta: {
      isPublic: true,
    },
    name: 'login',
    path: '/login',
  },
  {
    beforeEnter: [disallowAuthorized],
    component: VMailSentView,
    meta: {
      isPublic: true,
    },
    name: 'mail-sent',
    path: '/login/mail-sent',
  },
  {
    beforeEnter: [disallowAuthorized],
    component: VLoginResetView,
    meta: {
      isPublic: true,
    },
    name: 'login-reset',
    path: '/login/reset',
  },
  {
    beforeEnter: [disallowAuthorized],
    component: VLoginChangeView,
    meta: {
      isPublic: true,
    },
    name: 'login-change',
    path: '/auth/password/reset/:uid/:token/',
  },
  {
    beforeEnter: [loginByToken],
    component: VLoadingView,
    meta: {
      isPublic: true,
    },
    name: 'token',
    path: '/auth/passwordless/:passwordlessToken',
  },
  {
    beforeEnter: [loginById],
    component: VLoadingView,
    name: 'auth-as',
    path: '/auth/as/:userId',
  },
  {
    component: VNotionView,
    name: 'materials',
    path: '/materials/:id',
  },
  {
    component: VHomeworkQuestionView,
    name: 'homework-question',
    path: '/homework/questions/:questionId',
  },
  {
    component: VHomeworkExpertView,
    name: 'homework-expert',
    path: '/homework/question-admin/:questionId',
  },
  {
    component: VHomeworkAnswerView,
    name: 'homework-answer',
    path: '/homework/answers/:answerId',
  },
  {
    component: VCertificatesView,
    name: 'certificates',
    path: '/certificates',
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
