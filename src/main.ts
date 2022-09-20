import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './fonts.css';
import './tailwind.css';
import './main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
