import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import * as Sentry from '@sentry/vue';
import AvatarCropper from 'vue-avatar-cropper';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    app,
    dsn: 'https://c7d16bbe0bff41929238c6fefc3c6da0@app.glitchtip.com/10541',
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.captureConsoleIntegration(),
    ],
    tracesSampleRate: 0.5,
    tracePropagationTargets: [
      'localhost',
      /^https:\/\/lms\.tough-dev\.school\/api\//,
      /^http:\/\/127\.0\.0\.1:8000\//,
    ],
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0.8,
  });
}

export const vueQueryConfig = {
  enableDevtoolsV6Plugin: true,
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: false,
      },
    },
  },
};

app.use(VueQueryPlugin, vueQueryConfig);

app.use(FloatingVue);
app.use(AvatarCropper);

app.use(router);

app.mount('#app');
