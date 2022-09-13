import * as Sentry from '@sentry/vue';
import { Integrations as TracingIntegrations } from '@sentry/tracing';

export default ({ Vue }) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      Vue,
      dsn: 'https://ba238a6269f742aab98f715c334fbc36@o47144.ingest.sentry.io/5731954',
      integrations: [new TracingIntegrations.BrowserTracing()],
    });
  }
};
