import type { Meta, StoryFn } from '@storybook/vue3';

import { VThread } from '@/components/VThread';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockComment } from '@/mocks/mockComment';
import { mockComments } from '@/mocks/mockComments';
import { mockThread } from '@/mocks/mockThread';
import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

const originalPost = mockThread();
originalPost.created = dayjs().toISOString();
originalPost.descendants = mockComments([
  mockComment(mockThread(mockAnswer())),
  mockComment(mockThread(mockAnswer())),
]).descendants;
originalPost.descendants[1].descendants = mockComments([
  mockComment(mockThread(mockAnswer())),
]).descendants;

const userId = faker.string.uuid();

export default {
  component: VThread,
  title: 'Answer/VThread',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VThread },
  setup() {
    const user = useUser();
    user.$patch({
      uuid: userId,
    });
    return { args };
  },
  template: '<VThread v-bind="args" />',
});

export const Default = {
  args: { originalPost },
  render: Template,
};

export const Own = {
  args: {
    originalPost: {
      ...originalPost,
      author: { ...originalPost.author, uuid: userId },
    },
  },

  render: Template,
};
