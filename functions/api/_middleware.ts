//@ts-nocheck
import { PagesFunction } from '@cloudflare/workers-types';

// const API_URL = 'https://app.tough-dev.school';

// export const onRequestOptions: PagesFunction = async () => {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': '*',
//       'Access-Control-Allow-Methods': 'GET, OPTIONS',
//       'Access-Control-Max-Age': '86400',
//     },
//   });
// };

// export const onRequest: PagesFunction = async ({ next }) => {
//   const response = await next();
//   response.headers.set('Access-Control-Allow-Origin', '*');
//   response.headers.set('Access-Control-Max-Age', '86400');
//   return response;
// };

export const onRequest: PagesFunction = () => {
  return new Response('Hello form middleware!');
};
