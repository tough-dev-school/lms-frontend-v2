import { Hono } from 'hono';
import type { Context } from 'hono';
import { contextStorage } from 'hono/context-storage';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';
import { inertia } from '@brachkow/hono-inertia';
import { isApiError } from '@/api/client';
import { urls } from '@/urls';
import { renderPage } from '@/ssr';
import { apiProxy, configureApiClient } from './api';
import { assetVersion } from './assets';
import { clearToken, getMe, loginRedirect, requireAuth, session } from './auth';
import { isProduction } from './env';
import { shareOneTimeData } from './forms';
import { preferences } from './preferences';
import { render } from './render';
import { auth } from './routes/auth';
import { courses } from './routes/courses';
import { homework } from './routes/homework';
import { materials } from './routes/materials';
import { settings } from './routes/settings';
import type { AppEnv } from './types';

configureApiClient();

// The adapter runs this for every request, redirects included. A function prop is resolved
// only when a page renders, so logout and redirects don't wait for the backend.
const shareProps = (c: Context<AppEnv>) => ({
  user: () => (c.var.token ? getMe(c) : null),
  locale: c.var.locale,
  theme: c.var.theme,
  timezone: c.var.timezone,
  origin: new URL(c.req.url).origin,
});

const app = new Hono<AppEnv>();

app.onError((error, c) => {
  if (isApiError(error) && error.status === 401) {
    // The backend no longer accepts the token, so the student has to log in again
    clearToken(c);
    return loginRedirect(c);
  }
  if (isApiError(error) && error.status === 404) {
    return c.notFound();
  }

  console.error(error);
  return c.text('Internal Server Error', 500);
});

// Unknown pages used to land on the course list, links in old emails rely on it
app.notFound((c) => c.redirect(urls.courses()));

app
  // Lets the API client find the current request without passing it around
  .use(contextStorage())
  .use(
    secureHeaders({
      contentSecurityPolicy: undefined,
      // Hono defaults to no-referrer, and redirecting back after a form needs the Referer
      referrerPolicy: 'strict-origin-when-cross-origin',
    }),
  )
  // Forms post JSON, which browsers can't send cross-site without CORS, this covers the rest
  .use(csrf())
  .use(session)
  .use(preferences)
  .all('/api/*', apiProxy)
  .use(
    inertia({
      version: assetVersion,
      render,
      ssr: { render: renderPage },
      onSsrError: (error) => {
        if (!isProduction()) throw error;
        console.error('SSR failed, falling back to client rendering', error);
      },
      share: (c) => shareProps(c as Context<AppEnv>),
    }),
  )
  .use(shareOneTimeData)
  .get('/', (c) => c.redirect(urls.courses()))
  .route('/', auth)
  .use(requireAuth)
  .route('/', courses)
  .route('/', homework)
  .route('/', materials)
  .route('/', settings)
  // Links from the first version of the LMS
  .get('/:courseId/modules', (c) =>
    c.redirect(urls.course(Number(c.req.param('courseId')))),
  )
  .get('/:courseId/module/:moduleId/lessons', (c) =>
    c.redirect(
      urls.module(
        Number(c.req.param('courseId')),
        Number(c.req.param('moduleId')),
      ),
    ),
  );

export default app;
