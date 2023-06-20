import type { Meta, StoryFn } from '@storybook/vue3';
import { VReactionsPalette } from '.';
import { VCard } from '@/components/VCard';

export default {
  title: 'Reactions/VReactionsPalette',
  component: VReactionsPalette,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VReactionsPalette, VCard },
  setup() {
    return { args };
  },
  template: '<VCard><VReactionsPalette v-bind="args" /></VCard>',
});

export const Default = {
  render: Template,
};
