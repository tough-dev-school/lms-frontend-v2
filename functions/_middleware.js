export async function onRequest(context) {
  const { request, next } = context;
  const res = await next();
  const { pathname } = new URL(request.url);

  if (pathname.startsWith('/api/')) {
    return new Response.redirect(
      'https://app.tough-dev.school' + pathname,
      '200',
    );
  }

  return res;
}
