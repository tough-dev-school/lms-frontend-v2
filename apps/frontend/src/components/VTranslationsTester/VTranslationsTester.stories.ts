import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VTranslationsTester from './VTranslationsTester.vue';

export default {
  title: 'Tools/Translations',
  component: VTranslationsTester,
} as Meta;

const Template: StoryFn = () => ({
  components: { VTranslationsTester },
  template: '<VTranslationsTester />',
});

export const Default = Template.bind({});
