import type { Context, MiddlewareHandler } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { isApiError } from '@/api/client';
import type { AppEnv } from './types';

export type FormErrors = Record<string, string>;

const ERRORS_COOKIE = 'errors';
const FLASH_COOKIE = 'flash';

const flatten = (value: unknown, prefix = ''): [string, string][] => {
  if (Array.isArray(value)) {
    return value.every((item) => typeof item === 'string')
      ? [[prefix, value.join(' ')]]
      : value.flatMap((item, index) => flatten(item, `${prefix}.${index}`));
  }
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([key, item]) =>
      flatten(item, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [[prefix, String(value)]];
};

// DRF answers with {field: [messages]} or {detail: message}, Inertia expects {field: message}
export const toFormErrors = (data: unknown): FormErrors => {
  if (typeof data !== 'object' || data === null) {
    return { non_field_errors: String(data ?? 'Unknown error') };
  }

  const { detail, ...fields } = data as Record<string, unknown>;

  return Object.fromEntries([
    ...flatten(fields),
    ...(detail === undefined ? [] : [['non_field_errors', String(detail)]]),
  ]);
};

const getReferer = (c: Context) => {
  const referer = c.req.header('Referer');
  if (!referer) return undefined;

  const url = new URL(referer);
  // Only send people back within the app
  if (url.origin !== new URL(c.req.url).origin) return undefined;
  return `${url.pathname}${url.search}`;
};

export const redirectBack = (c: Context, fallback = '/') =>
  c.redirect(getReferer(c) ?? fallback, 303);

// There is no server session, so errors and flash data survive the redirect in short-lived cookies
const setOneTimeCookie = (c: Context, name: string, value: object) => {
  setCookie(c, name, JSON.stringify(value), {
    httpOnly: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: 60,
  });
};

const readOneTimeCookie = (c: Context, name: string) => {
  const value = getCookie(c, name);
  if (!value) return undefined;

  try {
    return JSON.parse(value) as Record<string, unknown>;
  } catch {
    // A broken cookie means nothing to show
    return undefined;
  }
};

export const redirectBackWithErrors = (
  c: Context,
  errors: FormErrors,
  fallback?: string,
) => {
  setOneTimeCookie(c, ERRORS_COOKIE, errors);
  return redirectBack(c, fallback);
};

export const redirectWithErrors = (
  c: Context,
  url: string,
  errors: FormErrors,
) => {
  setOneTimeCookie(c, ERRORS_COOKIE, errors);
  return c.redirect(url, c.req.method === 'GET' ? 302 : 303);
};

export const setFlash = (c: Context, data: Record<string, unknown>) => {
  setOneTimeCookie(c, FLASH_COOKIE, data);
};

export const shareOneTimeData: MiddlewareHandler<AppEnv> = async (c, next) => {
  const errors = readOneTimeCookie(c, ERRORS_COOKIE);
  const flash = readOneTimeCookie(c, FLASH_COOKIE);

  if (errors) c.var.inertia.share({ errors });
  if (flash) c.var.inertia.flash(flash);

  await next();

  // A redirect chain like / → /courses → /login must carry the data to the page that renders it
  const isRedirect = c.res.status >= 300 && c.res.status < 400;
  if (isRedirect) return;
  if (errors) deleteCookie(c, ERRORS_COOKIE, { path: '/' });
  if (flash) deleteCookie(c, FLASH_COOKIE, { path: '/' });
};

// Wraps a form submission: validation errors from the backend go back to the form
export const submitForm = async (
  c: Context,
  action: () => Promise<Response>,
  fallback?: string,
) => {
  try {
    return await action();
  } catch (error) {
    if (isApiError(error) && error.status === 400) {
      return redirectBackWithErrors(c, toFormErrors(error.data), fallback);
    }
    throw error;
  }
};
