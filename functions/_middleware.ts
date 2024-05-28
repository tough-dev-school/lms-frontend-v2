//@ts-nocheck
import { PagesFunction } from '@cloudflare/workers-types';

const ALLOWED_ORIGIN = 'lms-frontend-v2.pages.dev';

const rewrites = (url: string) => ({
  [`${new URL(url).hostname}/api/`]: 'https://app.tough-dev.school/api/',
});

const getRewriteKey = (url: string) => {
  return Object.keys(rewrites(url)).find((key) => url.startsWith(key));
};

const isAllowedOrigin = (url: string) => {
  return new URL(url).hostname.endsWith(ALLOWED_ORIGIN);
};

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

export const onRequest: PagesFunction = async (context) => {
  const rewriteKey = getRewriteKey(context.request.url);

  if (rewriteKey) {
    const newUrl = context.request.url.replace(
      rewriteKey,
      rewrites(rewriteKey)[rewriteKey],
    );
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
