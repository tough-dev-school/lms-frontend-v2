import type { Meta, StoryFn } from '@storybook/vue3';
import VPasswordSettings from '@/components/VPasswordSettings';

export default {
  title: 'Settings/VPasswordSettings',
  component: VPasswordSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VPasswordSettings },
  setup() {
    return { args };
  },
  template: '<VPasswordSettings v-bind="args"/>',
});

export const Default = {
  render: Template,
  args: {},
};
