import App from './App.vue';
import vueRouter from 'storybook-vue3-router';
import { routes, beforeEach } from './router/index';

export default {
  title: 'Pages/App',
  component: App,
};

const Template = (args) => ({
  components: { App },
  setup() {
    return { args };
  },
  template: '<App v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};

Default.decorators = [vueRouter(routes, { beforeEach })];
