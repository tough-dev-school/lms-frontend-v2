import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAvatarSettings from '@/components/VAvatarSettings/VAvatarSettings.vue';

export default {
  title: 'Settings/VAvatarSettings',
  component: VAvatarSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAvatarSettings },
  setup() {
    return { args };
  },
  template: '<VAvatarSettings v-bind="args"/>',
});

export const Default = {
  render: Template,
  args: {},
};
