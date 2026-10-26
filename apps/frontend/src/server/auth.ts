import type { Context, MiddlewareHandler } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { decode } from 'hono/jwt';
import { usersMeRetrieve } from '@/api/generated';
import { urls } from '@/urls';
import { isProduction } from './env';
import type { AppEnv } from './types';

const TOKEN_COOKIE = 'token';
const DAY_IN_MS = 1000 * 60 * 60 * 24;
const FALLBACK_TOKEN_AGE = 30 * DAY_IN_MS;
// Browsers cap cookies at 400 days and Hono refuses to set a longer one
const MAX_COOKIE_AGE = 400 * DAY_IN_MS;

const readTokenExpiry = (token: string) => {
  try {
    const { payload } = decode(token);
    if (typeof payload.exp === 'number') return payload.exp * 1000;
  } catch {
    // Not a JWT we can read, fall back to a fixed lifetime
  }
  return Date.now() + FALLBACK_TOKEN_AGE;
};

// Backend JWTs carry their own expiry, the cookie should not outlive it
const getTokenExpiry = (token: string) =>
  new Date(Math.min(readTokenExpiry(token), Date.now() + MAX_COOKIE_AGE));

export const setToken = (c: Context, token: string) => {
  setCookie(c, TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: 'Lax',
    path: '/',
    expires: getTokenExpiry(token),
  });
};

export const clearToken = (c: Context) => {
  deleteCookie(c, TOKEN_COOKIE, { path: '/' });
};

export const session: MiddlewareHandler<AppEnv> = async (c, next) => {
  // Django admin opens student pages with a token in the URL. It works for that page only, like before.
  c.set('token', c.req.query('t') || getCookie(c, TOKEN_COOKIE));
  await next();
};

export const getMe = (c: Context<AppEnv>) => {
  if (!c.var.me) c.set('me', usersMeRetrieve());
  return c.var.me!;
};

const currentPath = (c: Context) => {
  const url = new URL(c.req.url);
  return `${url.pathname}${url.search}`;
};

export const loginRedirect = (c: Context) =>
  c.req.method === 'GET'
    ? c.redirect(urls.login(currentPath(c)))
    : c.redirect(urls.login(), 303);

export const requireAuth: MiddlewareHandler<AppEnv> = async (c, next) => {
  if (!c.var.token) return loginRedirect(c);
  await next();
};

export const guestOnly: MiddlewareHandler<AppEnv> = async (c, next) => {
  if (c.var.token) return c.redirect(urls.courses());
  await next();
};

// Only local paths, so a crafted login link can't send students to another site
export const safeRedirectPath = (value: unknown) =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : urls.courses();
