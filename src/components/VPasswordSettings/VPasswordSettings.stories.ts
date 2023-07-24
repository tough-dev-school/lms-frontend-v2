import type { Meta, StoryFn } from '@storybook/vue3';

import { VPasswordSettings } from '@/components/VPasswordSettings';

export default {
  component: VPasswordSettings,
  title: 'Settings/VPasswordSettings',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VPasswordSettings },
  setup() {
    return { args };
  },
  template: '<VPasswordSettings v-bind="args"/>',
});

export const Default = {
  args: {},
  render: Template,
};
