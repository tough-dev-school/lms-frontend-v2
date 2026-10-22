import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VSupportChat from '@/components/VSupportChat/VSupportChat.vue';

export default {
  title: 'UI/VSupportChat',
  component: VSupportChat,
} as Meta;

// The button is fixed to the bottom right corner of the viewport
export const Default: StoryFn = () => ({
  components: { VSupportChat },
  template: '<VSupportChat />',
});
