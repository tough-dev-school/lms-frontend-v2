import type { Meta, StoryFn } from '@storybook/vue3';
import { VButton } from '@/components/VButton';

export default {
  title: 'Forms/VButton',
  component: VButton,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VButton },
  setup() {
    return { args };
  },
  template: '<VButton v-bind="args">Press me</VButton>',
});

export const Default = {
  render: Template,

  args: {
    appearance: 'button',
  },
};

export const Link = {
  render: Template,

  args: {
    appearance: 'link',
  },
};
