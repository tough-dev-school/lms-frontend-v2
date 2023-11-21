import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';

import './fonts.css';
import './style.css';

const app = createApp(App);

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    app,
    dsn: 'https://4bd3741410104a88a731d82ee59341b0@o47144.ingest.sentry.io/4504038554664960',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
    ],
    tracesSampleRate: 1.0,
  });
}

app.use(FloatingVue);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(router);

app.mount('#app');
