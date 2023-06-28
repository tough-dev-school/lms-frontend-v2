import type { Meta, StoryFn } from '@storybook/vue3';
import { VThread } from '@/components/VThread';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import useUser from '@/stores/user';
import { mockThread } from '@/mocks/mockThread';
import { mockComments } from '@/mocks/mockComments';

const originalPost = mockThread();
originalPost.created = dayjs().toISOString();
originalPost.descendants = mockComments(originalPost).descendants;
originalPost.descendants[1].descendants =
  mockComments(originalPost).descendants;

const userId = faker.datatype.uuid();

export default {
  title: 'Answer/VThread',
  component: VThread,
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
  render: Template,
  args: { originalPost },
};

export const Own = {
  render: Template,

  args: {
    originalPost: {
      ...originalPost,
      author: { ...originalPost.author, uuid: userId },
    },
  },
};
