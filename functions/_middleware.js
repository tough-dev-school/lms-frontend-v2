export async function onRequest(context) {
  const { request, next } = context;
  const res = await next();
  const { pathname } = new URL(request.url);

  if (pathname.startsWith('/api/')) {
    return new Response.redirect('http://example.com', '304');
  }

  return res;
}
