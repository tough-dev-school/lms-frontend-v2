import './style.css';
import { createInertiaApp } from '@inertiajs/vue3';
import * as Sentry from '@sentry/vue';
import { createAppI18n } from '@/i18n';
import { resolvePage } from '@/pages';
import { TIMEZONE_COOKIE, writePreferenceCookie } from '@/preferences';

const LMS_ORIGIN = /^https:\/\/lms\.tough-dev\.school\//;

// Lets the server render dates in the student's zone from the next request on
const reportTimezone = (serverTimezone: string) => {
  const { timeZone } = new Intl.DateTimeFormat().resolvedOptions();
  if (timeZone && timeZone !== serverTimezone) {
    writePreferenceCookie(TIMEZONE_COOKIE, timeZone);
  }
};

await createInertiaApp({
  resolve: resolvePage,
  progress: { delay: 250 },
  withApp: (app, { page }) => {
    app.use(createAppI18n(page.props.locale));
    reportTimezone(page.props.timezone);

    // A production build run locally would report to the real project
    if (import.meta.env.PROD && location.hostname !== 'localhost') {
      Sentry.init({
        app,
        dsn: 'https://c7d16bbe0bff41929238c6fefc3c6da0@app.glitchtip.com/10541',
        integrations: [Sentry.captureConsoleIntegration()],
        tracesSampleRate: 0.5,
        tracePropagationTargets: ['localhost', LMS_ORIGIN],
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0.8,
      });
    }
  },
});
