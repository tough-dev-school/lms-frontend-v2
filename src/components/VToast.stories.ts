import type { Meta, Story } from '@storybook/vue3';
import VToast from '@/components/VToast.vue';

export default {
  title: 'VToasts/VToast',
  component: VToast,
} as Meta;

const Template: Story = (args) => ({
  components: { VToast },
  setup() {
    return { args };
  },
  template: '<VToast v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = { text: 'This is a message!' };

export const Error = Template.bind({});
Error.args = { text: 'This is a error!', type: 'error' };

export const Success = Template.bind({});
Success.args = { text: 'This is a success!', type: 'success' };
