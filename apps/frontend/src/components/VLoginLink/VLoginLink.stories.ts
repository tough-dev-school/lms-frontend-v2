import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLoginLink from '@/components/VLoginLink/VLoginLink.vue';

export default {
  title: 'Login/VLoginLink',
  component: VLoginLink,
} as Meta;

const Template: StoryFn = () => ({
  components: { VLoginLink },
  template: '<VLoginLink />',
});

export const Default = {
  render: Template,
};
