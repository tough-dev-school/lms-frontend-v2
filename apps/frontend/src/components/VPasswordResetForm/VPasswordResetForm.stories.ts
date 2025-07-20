import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VPasswordResetForm from '@/components/VPasswordResetForm/VPasswordResetForm.vue';

export default {
  title: 'Settings/VPasswordResetForm',
  component: VPasswordResetForm,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VPasswordResetForm },
  setup() {
    return { args };
  },
  template: '<VPasswordResetForm v-bind="args"/>',
});

export const Default = {
  render: Template,
  args: {},
};
