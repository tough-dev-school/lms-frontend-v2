import type { Meta, StoryFn } from '@storybook/vue3';

import { VLinksSettings } from '@/components/VLinksSettings';

export default {
  component: VLinksSettings,
  title: 'Settings/VLinksSettings',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLinksSettings },
  setup() {
    return { args };
  },
  template: '<VLinksSettings v-bind="args"/>',
});

export const Default = {
  args: {},
  render: Template,
};
