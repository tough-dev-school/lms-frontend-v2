import type { Meta, Story } from '@storybook/vue3';
import VThread from '@/components/VThread.vue';
import { getCommentsData, getThreadData } from '@/mocks/homework';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import useUser from '@/stores/user';

const originalPost = getThreadData();
originalPost.created = dayjs().toISOString();
originalPost.descendants = getCommentsData(originalPost, 3);
originalPost.descendants[1].descendants = getCommentsData(originalPost);

const userId = faker.datatype.uuid();

export default {
  title: 'Answer/VThread',
  component: VThread,
} as Meta;

const Template: Story = (args) => ({
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

export const Default = Template.bind({});
Default.args = { originalPost };

export const Own = Template.bind({});
Own.args = {
  originalPost: {
    ...originalPost,
    author: { ...originalPost.author, uuid: userId },
  },
};
