import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router';
import ProfileView from '@/views/VProfileView.vue';
import LoginView from '@/views/VLoginView.vue';
import LoadingView from '@/views/VLoadingView.vue';
import NotionView from '@/views/VNotionView.vue';
import HomeworkQuestionView from '@/views/VHomeworkQuestionView.vue';
import HomeworkExpertView from '@/views/VHomeworkExpertView.vue';
import HomeworkAnswerView from '@/views/VHomeworkAnswerView.vue';
import useAuth from '@/stores/auth';
import useUser from '@/stores/user';
import useStudies from '@/stores/studies';

export const routes = [
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
    path: '/auth/passwordless/:passwordlessToken',
    name: 'token',
    component: LoadingView,
  },
  {
    path: '/materials/:id',
    name: 'materials',
    component: NotionView,
  },
  {
    path: '/homework/questions/:questionId',
    name: 'homework-question',
    component: HomeworkQuestionView,
  },
  {
    path: '/homework/question-admin/:questionId',
    name: 'homework-expert',
    component: HomeworkExpertView,
  },
  {
    path: '/homework/answers/:answerId',
    name: 'homework-answer',
    component: HomeworkAnswerView,
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
    next('/login');
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
