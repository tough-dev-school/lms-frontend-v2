import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router';
import VProfileView from '@/views/VProfileView.vue';
import VLoginView from '@/views/VLoginView.vue';
import VLoadingView from '@/views/VLoadingView.vue';
import VNotionView from '@/views/VNotionView.vue';
import VHomeworkQuestionView from '@/views/VHomeworkQuestionView.vue';
import VHomeworkExpertView from '@/views/VHomeworkExpertView.vue';
import VHomeworkAnswerView from '@/views/VHomeworkAnswerView.vue';
import useAuth from '@/stores/auth';
import useUser from '@/stores/user';
import useStudies from '@/stores/studies';

export const routes = [
  {
    path: '/profile',
    name: 'profile',
    component: VProfileView,
  },
  {
    path: '/login',
    name: 'login',
    component: VLoginView,
  },
  {
    path: '/auth/passwordless/:passwordlessToken',
    name: 'token',
    component: VLoadingView,
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

const fetchMainUserData = async () => {
  const user = useUser();
  const studies = useStudies();
  await user.getData();
  await studies.getData();
};

const isPublicRoute = (name: string) => {
  const PUBLIC_ROUTES = ['login', 'token'];
  return PUBLIC_ROUTES.includes(String(name));
};

export const beforeEach = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const auth = useAuth();

  const isAuthorized = !!auth.token;

  // Redirect to exisiting route if route does not exist
  if (!to.name) {
    next('/profile');
  }

  // Passwordless token
  if (to.name === 'token') {
    const auth = useAuth();
    await auth.exchangeTokens(String(to.params.passwordlessToken));
    next('/profile');
  }

  // Redirect to /login if unauthorized and route is not public
  if (!(isAuthorized || isPublicRoute(String(to.name)))) {
    next(`/login?next=${encodeURIComponent(to.fullPath)}`);
  }

  // Restrict auth routes for authorized users
  if (isAuthorized && (to.name === 'login' || to.name === 'token')) {
    next('/profile');
  }

  // Get main data if authorized
  if (isAuthorized) {
    await fetchMainUserData();
    next();
  }

  next();
};

router.beforeEach(beforeEach);

export default router;
