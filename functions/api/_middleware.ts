//@ts-nocheck
import { PagesFunction } from '@cloudflare/workers-types';

const API_URL = 'https://app.tough-dev.school';
const ALLOWED_ORIGIN = 'lms-frontend-v2.pages.dev';

const isAllowedOrigin = (url: string) => {
  return new URL(url).hostname.endsWith(ALLOWED_ORIGIN);
};

export const onRequestOptions: PagesFunction = async (context) => {
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
};

export const onRequest: PagesFunction = async (context) => {
  const targetUrl = API_URL + new URL(context.request.url).pathname;

  const immutableResponse = await fetch(
    new Request(targetUrl, context.request),
  );
  const response = new Response(immutableResponse.body, immutableResponse);

  if (isAllowedOrigin(context.request.url)) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  return response;
};
