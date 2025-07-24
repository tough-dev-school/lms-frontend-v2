import {
  PagesFunction,
  Response,
  Request,
  fetch,
} from '@cloudflare/workers-types';

const ALLOWED_ORIGINS = ['lms-frontend-v2.pages.dev'];

const isAllowedOrigin = (url: string) => {
  return ALLOWED_ORIGINS.find((allowedOrigin) =>
    new URL(url).origin.endsWith(allowedOrigin),
  );
};

const getRewrites = (url: string): Record<string, string> => {
  const rewrites = {
    [`${new URL(url).origin}/api/`]: 'https://app.tough-dev.school/api/',
  };
  console.log('Using rewrites:', rewrites);
  return rewrites;
};

const getRewriteKey = (url: string, rewrites: Record<string, string>) => {
  return Object.keys(rewrites).find((key) => url.startsWith(key));
};

const getRewriteUrl = (url: string) => {
  const rewrites = getRewrites(url);
  const rewriteKey = getRewriteKey(url, rewrites);

  return rewriteKey ? url.replace(rewriteKey, rewrites[rewriteKey]) : undefined;
};

export const onRequestOptions: PagesFunction = async (context) => {
  const rewriteUrl = getRewriteUrl(context.request.url);

  if (rewriteUrl && isAllowedOrigin(context.request.url)) {
    const response = new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Origin': '*',
      },
    });

    return response;
  }

  return await context.next();
};

export const onRequest: PagesFunction = async (context): Promise<Response> => {
  const rewriteUrl = getRewriteUrl(context.request.url);

  if (!rewriteUrl) {
    return await context.next();
  }

  const immutableResponse = await fetch(
    new Request(rewriteUrl, context.request),
  );
  const response = new Response(immutableResponse.body, immutableResponse);

  if (isAllowedOrigin(context.request.url)) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  return response;
};
