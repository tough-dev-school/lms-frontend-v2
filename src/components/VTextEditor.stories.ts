import type { Meta, Story } from '@storybook/vue3';
import VTextEditor from '@/components/VTextEditor.vue';

export default {
  title: 'Forms/VTextEditor',
  component: VTextEditor,
} as Meta;

const Template: Story = (args) => ({
  components: { VTextEditor },
  setup() {
    return { args };
  },
  template: '<VTextEditor v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'You can change placeholder text',
};
