import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/styles/global.css';

Vue.config.productionTip = false;

function loadApplicationPlugins(ctx) {
  const plugins = [];

  function importAll(r) {
    r.keys().forEach((key) => plugins.push(r(key)));
  }

  importAll(require.context('./plugins/', false, /\d+_.*\.js$/));

  plugins.forEach((plugin) => (plugin.default ? plugin.default(ctx) : null));
}

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

loadApplicationPlugins({ Vue, app, store, router });
