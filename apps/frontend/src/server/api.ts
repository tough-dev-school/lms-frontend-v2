import type { Context } from 'hono';
import { getContext } from 'hono/context-storage';
import { proxy } from 'hono/proxy';
import { setRequestContextResolver } from '@/api/client';
import { getApiUrl } from './env';
import type { AppEnv } from './types';

const authHeaders = (c: Context<AppEnv>): Record<string, string> => ({
  // Lets backend error messages follow the interface language
  'Accept-Language': c.var.locale,
  ...(c.var.token && {
    Authorization: `Bearer ${c.var.token}`,
    frkn: '1',
  }),
});

export const configureApiClient = () => {
  setRequestContextResolver(() => {
    const c = getContext<AppEnv>();
    return { baseUrl: getApiUrl(), headers: authHeaders(c) };
  });
};

// Browser code still talks to the backend for uploads, reactions and material status.
// The token is in an httpOnly cookie, so the server adds it here.
export const apiProxy = (c: Context<AppEnv>) => {
  const url = new URL(c.req.url);
  const target = new URL(`${url.pathname}${url.search}`, getApiUrl());
  const headers = new Headers(c.req.raw.headers);

  headers.delete('cookie');
  headers.delete('host');
  Object.entries(authHeaders(c)).forEach(([key, value]) =>
    headers.set(key, value),
  );

  return proxy(target, { raw: c.req.raw, headers });
};
