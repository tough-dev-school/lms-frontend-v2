import type { Meta, StoryFn } from '@storybook/vue3';
import VTextEditor from '@/components/VTextEditor';

export default {
  title: 'Forms/VTextEditor',
  component: VTextEditor,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VTextEditor },
  setup() {
    return { args };
  },
  template: '<VTextEditor v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};

export const Placeholder = {
  render: Template,

  args: {
    placeholder: 'You can change placeholder text',
  },
};
