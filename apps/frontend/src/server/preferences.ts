import type { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';
import { detectLocale, isLocale } from '@/i18n';
import {
  DEFAULT_THEME,
  DEFAULT_TIMEZONE,
  LOCALE_COOKIE,
  THEME_COOKIE,
  TIMEZONE_COOKIE,
  isTheme,
} from '@/preferences';
import type { AppEnv } from './types';

const parseAcceptLanguage = (header: string | undefined) =>
  (header ?? '').split(',').map((part) => part.split(';')[0].trim());

// The cookie is written by the browser, so it may hold anything. Intl throws on unknown zones
// and still accepts aliases like Europe/Kiev that supportedValuesOf leaves out.
const isTimezone = (value: string) => {
  try {
    return Boolean(
      new Intl.DateTimeFormat(undefined, { timeZone: value }).resolvedOptions()
        .timeZone,
    );
  } catch {
    return false;
  }
};

export const preferences: MiddlewareHandler<AppEnv> = async (c, next) => {
  const locale = getCookie(c, LOCALE_COOKIE);
  const theme = getCookie(c, THEME_COOKIE);
  const timezone = getCookie(c, TIMEZONE_COOKIE);

  c.set(
    'locale',
    isLocale(locale)
      ? locale
      : detectLocale(parseAcceptLanguage(c.req.header('Accept-Language'))),
  );
  c.set('theme', isTheme(theme) ? theme : DEFAULT_THEME);
  c.set(
    'timezone',
    timezone && isTimezone(timezone) ? timezone : DEFAULT_TIMEZONE,
  );

  await next();
};
