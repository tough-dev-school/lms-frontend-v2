import type { Meta, Story } from '@storybook/vue3';
import TextInput from '@/components/VTextInput.vue';

export default {
  title: 'Forms/TextInput',
  component: TextInput,
} as Meta;

const Template: Story = (args) => ({
  components: { TextInput },
  setup() {
    return { args };
  },
  template: '<TextInput placeholder="Enter some text…" v-bind="args" />',
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
