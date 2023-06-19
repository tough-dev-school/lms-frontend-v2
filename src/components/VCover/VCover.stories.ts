import type { Meta, StoryFn } from '@storybook/vue3';

import VCover from '@/components/VCover';

export default {
  title: 'UI/VCover',
  component: VCover,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCover },
  setup() {
    return { args };
  },
  template: '<VCover v-bind="args" />',
});

export const AutoCover = {
  render: Template,

  args: {
    name: 'Cool Course',
  },
};

export const RealCover = {
  render: Template,

  args: {
    name: 'Cool Course',
    image: 'https://picsum.photos/1500/600',
  },
};
