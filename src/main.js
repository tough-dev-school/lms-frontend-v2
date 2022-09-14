import Vue from 'vue';
import App from './App.vue';
import Icon from 'vue-awesome/components/Icon';
import VueScrollTo from 'vue-scrollto';
import router from './router';
import store from './store';
import * as Sentry from '@sentry/vue';
import { Integrations as TracingIntegrations } from '@sentry/tracing';

import '@/assets/styles/global.css';

Vue.component('AppIcon', Icon);
Vue.use(VueScrollTo);

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    Vue,
    dsn: 'https://ba238a6269f742aab98f715c334fbc36@o47144.ingest.sentry.io/5731954',
    integrations: [new TracingIntegrations.BrowserTracing()],
  });
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
