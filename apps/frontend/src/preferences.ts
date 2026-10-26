// Preferences live in cookies, so the server renders the right language and theme on the first response
export const LOCALE_COOKIE = 'locale';
export const THEME_COOKIE = 'theme';
export const TIMEZONE_COOKIE = 'timezone';

export const THEMES = ['auto', 'light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = 'auto';

export const isTheme = (value: unknown): value is Theme =>
  THEMES.includes(value as Theme);

// The server has no idea where the student is until the browser reports it in a cookie
export const DEFAULT_TIMEZONE = 'Europe/Moscow';

const YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const writePreferenceCookie = (name: string, value: string) => {
  // The async Cookie Store API is newer than the browsers we support
  // eslint-disable-next-line unicorn/no-document-cookie
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${YEAR_IN_SECONDS}; samesite=lax`;
};

// Runs in <head> before the page paints, so dark mode users never see a white flash.
// The server can't know the system theme, so "auto" is resolved here.
export const themeBootScript = `(() => {
  const root = document.documentElement;
  const query = matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    if (root.dataset.theme !== 'auto') return;
    root.classList.toggle('dark', query.matches);
  };
  apply();
  query.addEventListener('change', apply);
})();`;

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle(
    'dark',
    theme === 'dark' ||
      (theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches),
  );
};
