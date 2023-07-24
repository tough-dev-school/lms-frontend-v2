import type { Meta, StoryFn } from '@storybook/vue3';

import { VTextEditor } from '@/components/VTextEditor';

export default {
  component: VTextEditor,
  title: 'Forms/VTextEditor',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VTextEditor },
  setup() {
    return { args };
  },
  template: '<VTextEditor v-bind="args" />',
});

export const Default = {
  args: {},
  render: Template,
};

export const Placeholder = {
  args: {
    placeholder: 'You can change placeholder text',
  },

  render: Template,
};
