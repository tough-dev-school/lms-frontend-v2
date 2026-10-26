// Named routes used to live in vue-router. The server owns routing now, so pages build links with these.
const withQuery = (path: string, query: Record<string, string | undefined>) => {
  const url = new URL(path, 'http://localhost');

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, value);
  });

  return `${url.pathname}${url.search}`;
};

export const urls = {
  courses: () => '/courses',
  course: (courseId: number) => `/courses/${courseId}`,
  module: (courseId: number, moduleId: number) =>
    `/courses/${courseId}/modules/${moduleId}`,
  material: (materialId: string) => `/materials/${materialId}`,
  homework: (questionId: string, answerId?: string) =>
    withQuery(`/homework/${questionId}`, { answerId }),
  certificates: () => '/certificates',
  settings: (hash?: string) => `/settings${hash ? `#${hash}` : ''}`,
  login: (redirectTo?: string) => withQuery('/login', { redirectTo }),
  loginReset: () => '/login/reset',
  mailSent: (email?: string) => withQuery('/login/mail-sent', { email }),
  logout: () => '/logout',
};
