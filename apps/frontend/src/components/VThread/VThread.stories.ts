import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VThreadProvider from '@/components/VThread/VThreadProvider.vue';
import { usersMeRetrieveQueryKey } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import { usePopulateAnswersCache } from '@/composables/usePopulateAnswersCache';
import { CLASSMATE_ANSWER, STUDENT_ANSWER } from '@/mocks/homework';
import { STUDENT } from '@/mocks/users';

// Every answer in a thread loads itself by slug, so the whole tree goes into the cache
export default {
  title: 'Answer/VThread',
  component: VThreadProvider,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VThreadProvider },
  setup() {
    useQueryClient().setQueryData(usersMeRetrieveQueryKey(), STUDENT);
    usePopulateAnswersCache()(args.answer);
    return { args };
  },
  template: '<VThreadProvider :answer-id="args.answer.slug" />',
});

export const OwnAnswer = {
  render: Template,
  args: {
    answer: STUDENT_ANSWER,
  },
};

export const ClassmateAnswer = {
  render: Template,
  args: {
    answer: CLASSMATE_ANSWER,
  },
};
