import type { Meta, StoryFn } from '@storybook/vue3';
import { VOwnAnswer } from '@/components/VOwnAnswer';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { mockAnswer } from '@/mocks/mockAnswer';
import useUser from '@/stores/user';
import { USER_1 } from '@/mocks/mockUserId';
import { STATIC_AUTHOR_1 } from '@/mocks/mockAuthor';

export default {
  title: 'Answer/VOwnAnswer',
  component: VOwnAnswer,
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
  render: Template,

  args: {
    answer: answer,
    questionId: faker.string.uuid(),
    parentId: faker.string.uuid(),
  },
};

export const Editable = {
  render: Template,

  args: {
    answer: editableAnswer,
    questionId: faker.string.uuid(),
    parentId: faker.string.uuid(),
  },
};
