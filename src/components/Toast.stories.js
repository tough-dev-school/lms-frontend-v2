import Toast from './Toast.vue';

export default {
  title: 'Basic/Toast',
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
