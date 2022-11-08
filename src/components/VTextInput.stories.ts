import type { Meta, Story } from '@storybook/vue3';
import VTextInput from '@/components/VTextInput.vue';

export default {
  title: 'Forms/VTextInput',
  component: VTextInput,
} as Meta;

const Template: Story = (args) => ({
  components: { VTextInput },
  setup() {
    return { args };
  },
  template: '<VTextInput placeholder="Enter some text…" v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  tip: 'This is a tooltip for text',
  label: 'Basic text input',
};

export const ErrorWithMessage = Template.bind({});
ErrorWithMessage.args = {
  error: 'This is error',
};

export const ErrorWithoutMessage = Template.bind({});
ErrorWithoutMessage.args = {
  error: true,
};
