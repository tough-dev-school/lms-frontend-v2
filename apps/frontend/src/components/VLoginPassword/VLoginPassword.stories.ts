import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLoginPassword from '@/components/VLoginPassword/VLoginPassword.vue';

export default {
  title: 'Login/VLoginPassword',
  component: VLoginPassword,
} as Meta;

const Template: StoryFn = () => ({
  components: { VLoginPassword },
  template: '<VLoginPassword />',
});

export const Default = {
  render: Template,
};
