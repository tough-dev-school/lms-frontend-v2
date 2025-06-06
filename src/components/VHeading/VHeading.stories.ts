import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHeading from '@/components/VHeading/VHeading.vue';

export default {
  title: 'UI/VHeading',
  component: VHeading,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHeading },
  setup() {
    return { args };
  },
  template: '<VHeading v-bind="args">VHeading</VHeading>',
});

export const Default = {
  render: Template,
  args: {},
};

export const H1 = {
  render: Template,

  args: {
    tag: 'h1',
  },
};

export const H2 = {
  render: Template,

  args: {
    tag: 'h2',
  },
};

export const H3 = {
  render: Template,

  args: {
    tag: 'h3',
  },
};
