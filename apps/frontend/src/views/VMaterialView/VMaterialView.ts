import type { RouteLocationNormalized } from 'vue-router';

export const isMaterialBookmarkUpdate = (
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
) => {
  if (
    from.name === 'materials' &&
    from.path === to.path &&
    from.query.bookmark !== to.query.bookmark
  ) {
    return true;
  }
  return false;
};
