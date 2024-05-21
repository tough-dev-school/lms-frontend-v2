//@ts-nocheck
import { PagesFunction } from '@cloudflare/workers-types';

const API_URL = 'https://app.tough-dev.school';
const ALLOWED_ORIGIN = 'lms-frontend-v2.pages.dev';

const getAllowedOrigin = (url: string) => {
  const hostname = new URL(url).hostname;
  return hostname.endsWith(ALLOWED_ORIGIN) ? hostname : '';
};

export const onRequestOptions: PagesFunction = async (context) => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': getAllowedOrigin(context.request.url),
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequest: PagesFunction = async (context) => {
  const targetUrl = API_URL + new URL(context.request.url).pathname;

  const immutableResponse = await fetch(
    new Request(targetUrl, context.request),
  );

  const response = new Response(immutableResponse.body, immutableResponse);

  response.headers.set(
    'Access-Control-Allow-Origin',
    getAllowedOrigin(context.request.url),
  );
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
};
