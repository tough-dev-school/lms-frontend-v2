import LoginView from './LoginView.vue';

export default {
  title: 'Pages/LoginView',
  component: LoginView,
};

const Template = (args) => ({
  components: { LoginView },
  setup() {
    return { args };
  },
  template: '<LoginView v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
