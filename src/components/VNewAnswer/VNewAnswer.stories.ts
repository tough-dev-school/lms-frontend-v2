import type { Meta, StoryFn } from '@storybook/vue3';
import VNewAnswer from '@/components/VNewAnswer/VNewAnswer.vue';
import { faker } from '@faker-js/faker';

export default {
  title: 'Answer/VNewAnswer',
  component: VNewAnswer,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VNewAnswer },
  setup() {
    return { args };
  },
  template: '<VNewAnswer v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    questionId: faker.string.uuid(),
    parentId: faker.string.uuid(),
  },
};
