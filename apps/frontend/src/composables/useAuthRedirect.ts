import { useRouter } from 'vue-router';

export const useAuthRedirect = () => {
  const router = useRouter();

  const paramName = 'returnTo';

  const redirectToAuthAndSaveRoute = () => {
    router.push({
      name: 'login',
      query: {
        ...router.currentRoute.value.query,
        [paramName]: encodeURIComponent(router.currentRoute.value.fullPath),
      },
    });
  };

  const redirectFromAuthAndRestoreRoute = () => {
    if (router.currentRoute.value.query[paramName]) {
      router.push({
        path: decodeURIComponent(
          String(router.currentRoute.value.query[paramName]),
        ),
      });
    } else router.push({ name: 'home' });
  };

  return {
    redirectToAuthAndSaveRoute,
    redirectFromAuthAndRestoreRoute,
  };
};
