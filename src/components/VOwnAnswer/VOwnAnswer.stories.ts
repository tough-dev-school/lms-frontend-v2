import type { Meta, StoryFn } from '@storybook/vue3';

import { VOwnAnswer } from '@/components/VOwnAnswer';
import { mockAnswer } from '@/mocks/mockAnswer';
import { STATIC_AUTHOR_1 } from '@/mocks/mockAuthor';
import { USER_1 } from '@/mocks/mockUserId';
import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export default {
  component: VOwnAnswer,
  title: 'Answer/VOwnAnswer',
} as Meta;

const userId = USER_1;
const generateAnswer = () => mockAnswer({ author: STATIC_AUTHOR_1 });
const editableAnswer = generateAnswer();
const answer = generateAnswer();
answer.created = dayjs().subtract(1, 'year').toISOString();

const Template: StoryFn = (args) => ({
  components: { VOwnAnswer },
  setup() {
    const user = useUser();

    user.$patch({
      uuid: userId,
    });

    return { args };
  },
  template: '<VOwnAnswer v-bind="args" />',
});

export const Default = {
  args: {
    answer: answer,
    parentId: faker.string.uuid(),
    questionId: faker.string.uuid(),
  },

  render: Template,
};

export const Editable = {
  args: {
    answer: editableAnswer,
    parentId: faker.string.uuid(),
    questionId: faker.string.uuid(),
  },

  render: Template,
};
