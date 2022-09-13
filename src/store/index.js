import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

import SecureLS from 'secure-ls';
const localStorage = new SecureLS({ isCompression: false });

Vue.use(Vuex);

import auth from './auth.js';
import answer from './answer.js';
import question from './question.js';
import user from './user.js';

export default new Vuex.Store({
  modules: {
    auth,
    answer,
    question,
    user,
  },
  plugins: [
    createPersistedState({
      paths: ['auth'],
      storage: {
        getItem: (key) => localStorage.get(key) || Cookies.get(key),
        setItem: (key, value) => localStorage.set(key, value),
        removeItem: (key) => localStorage.remove(key),
      },
    }),
  ],
});
