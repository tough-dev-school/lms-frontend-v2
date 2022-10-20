import type { Meta, Story } from '@storybook/vue3';
import Toast from './Toast.vue';

export default {
  title: 'Toasts/Toast',
  component: Toast,
} as Meta;

const Template: Story = (args) => ({
  components: { Toast },
  setup() {
    return { args };
  },
  template: '<Toast v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = { text: 'This is a message!' };

export const Error = Template.bind({});
Error.args = { text: 'This is a error!', type: 'error' };

export const Success = Template.bind({});
Success.args = { text: 'This is a success!', type: 'success' };
