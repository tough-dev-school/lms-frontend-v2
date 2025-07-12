import { useRouter } from 'vue-router';

export const useAuthRedirect = () => {
  const router = useRouter();

  const redirectToAuthAndSaveRoute = () => {
    router.push({
      name: 'login',
      query: {
        ...router.currentRoute.value.query,
        next: encodeURIComponent(router.currentRoute.value.fullPath),
      },
    });
  };

  const redirectFromAuthAndRestoreRoute = () => {
    if (router.currentRoute.value.query.next) {
      router.push({
        path: decodeURIComponent(String(router.currentRoute.value.query.next)),
      });
    } else router.push({ name: 'home' });
  };

  return {
    redirectToAuthAndSaveRoute,
    redirectFromAuthAndRestoreRoute,
  };
};
