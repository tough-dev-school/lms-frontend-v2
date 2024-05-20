//@ts-nocheck
import { type PagesFunction } from '@cloudflare/workers-types';

export const onRequestOptions: PagesFunction = async () => {
  return new Response('Hello from options middleware.ts!');
};

export const onRequest: PagesFunction = async ({ next }) => {
  // const response = await next();
  // response.headers.set('Access-Control-Allow-Origin', '*');
  // response.headers.set('Access-Control-Max-Age', '86400');
  return new Response('Hello from middleware.ts!');
};
