// #FIXME Remove the ts-expect-error comments after @cloudflare/workers-types will be fixed

import { PagesFunction } from '@cloudflare/workers-types';

// Describe your allowed origins
const ALLOWED_ORIGINS = ['lms-frontend-v2.pages.dev'];

const isAllowedOrigin = (url: string) => {
  return ALLOWED_ORIGINS.find((allowedOrigin) =>
    new URL(url).origin.endsWith(allowedOrigin),
  );
};

// Describe your rewrites
const getRewrites = (url: string): Record<string, string> => ({
  [`${new URL(url).origin}/api/`]: 'https://app.tough-dev.school/api/',
});

const getRewriteKey = (url: string) => {
  return Object.keys(getRewrites(url)).find((key) => url.startsWith(key));
};

//@ts-expect-error
export const onRequestOptions: PagesFunction = async (context) => {
  const rewriteKey = getRewriteKey(context.request.url);

  if (rewriteKey) {
    const response = new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Max-Age': '86400',
      },
    });

    if (isAllowedOrigin(context.request.url)) {
      response.headers.set('Access-Control-Allow-Origin', '*');
    }

    return response;
  }
  return await context.next();
};

//@ts-expect-error
export const onRequest: PagesFunction = async (context) => {
  console.log('Rewrites', getRewrites(context.request.url));
  const rewriteKey = getRewriteKey(context.request.url);

  if (rewriteKey) {
    const newUrl = context.request.url.replace(
      rewriteKey,
      getRewrites(rewriteKey)[rewriteKey],
    );
    console.log(`${context.request.url} -> ${newUrl}`);
    //@ts-expect-error
    const immutableResponse = await fetch(new Request(newUrl, context.request));
    const response = new Response(immutableResponse.body, immutableResponse);

    if (isAllowedOrigin(context.request.url)) {
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Max-Age', '86400');
    }

    return response;
  }

  return await context.next();
};
