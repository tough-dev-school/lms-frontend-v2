import { PagesFunction, Response } from '@cloudflare/workers-types';

export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const res = await next();
  const { pathname } = new URL(request.url);

  if (pathname.startsWith('/api/')) {
    return Response.redirect('https://app.tough-dev.school' + pathname, 304);
  }

  return res;
};
