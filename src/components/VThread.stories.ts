import type { Meta, Story } from '@storybook/vue3';
import VThread from '@/components/VThread.vue';
import { getAnswerData, getAnswersData } from '@/mocks/homework';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import useUser from '@/stores/user';

const originalPost = getAnswerData();
originalPost.created = dayjs().toISOString();
originalPost.descendants = getAnswersData(3);
originalPost.descendants[1].descendants = getAnswersData();

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
