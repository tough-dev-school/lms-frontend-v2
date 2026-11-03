import type { RouterScrollBehavior } from 'vue-router';

export const scrollBehavior: RouterScrollBehavior = (
  to,
  from,
  savedPosition,
) => {
  if (to.hash) {
    return { el: to.hash, top: 32 };
  }

  if (savedPosition) {
    return savedPosition;
  }

  if (to.meta.handlesScroll) {
    return;
  }

  // Without this, moving to the next lesson keeps the scroll of the previous one
  if (to.path !== from.path) {
    return { top: 0 };
  }
};
