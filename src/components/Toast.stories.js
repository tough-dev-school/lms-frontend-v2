import Toast from './Toast.vue';

export default {
  title: 'Toasts/Toast',
  component: Toast,
};

const Template = (args) => ({
  components: { Toast },
  setup() {
    return { args };
  },
  template: '<Toast v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = { message: 'This is a toast!' };
