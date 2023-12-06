import type { Meta, StoryObj } from '@storybook/vue3';
import VNotionRenderer from './VNotionRenderer.vue';

export default {
  title: 'VNotionRenderer',
  component: VNotionRenderer,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VNotionRenderer },
  setup() {
    return { args };
  },
  template: '<VNotionRenderer v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};
