import type { Meta, StoryFn } from '@storybook/vue3';

import { VNewAnswer } from '@/components/VNewAnswer';
import { faker } from '@faker-js/faker';

export default {
  component: VNewAnswer,
  title: 'Answer/VNewAnswer',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VNewAnswer },
  setup() {
    return { args };
  },
  template: '<VNewAnswer v-bind="args" />',
});

export const Default = {
  args: {
    parentId: faker.string.uuid(),
    questionId: faker.string.uuid(),
  },

  render: Template,
};
