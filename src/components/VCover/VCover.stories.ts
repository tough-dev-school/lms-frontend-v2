import type { Meta, StoryFn } from '@storybook/vue3';

import { VCover } from '@/components/VCover';

export default {
  component: VCover,
  title: 'UI/VCover',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCover },
  setup() {
    return { args };
  },
  template: '<VCover v-bind="args" />',
});

export const AutoCover = {
  args: {
    name: 'Cool Course',
  },

  render: Template,
};

export const RealCover = {
  args: {
    image: 'https://picsum.photos/1500/600',
    name: 'Cool Course',
  },

  render: Template,
};
