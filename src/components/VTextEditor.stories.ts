import type { Meta, Story } from '@storybook/vue3';
import TextEditor from './TextEditor.vue';

export default {
  title: 'Forms/TextEditor',
  component: TextEditor,
} as Meta;

const Template: Story = (args) => ({
  components: { TextEditor },
  setup() {
    return { args };
  },
  template: '<TextEditor v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
