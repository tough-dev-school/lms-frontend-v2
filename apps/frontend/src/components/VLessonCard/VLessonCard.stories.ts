import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLessonCard from '@/components/VLessonCard/VLessonCard.vue';
import { RecommendedVideoProviderEnum } from '@/api/generated';
import type { Lesson } from '@/api/generated';
import {
  CALL,
  LESSON_CALL,
  LESSON_HOMEWORK,
  LESSON_HOMEWORK_NOT_SENT,
  LESSON_MATERIAL,
  MATERIAL,
  UPCOMING_CALL,
} from '@/mocks/courses';

export default {
  title: 'UI/VLessonCard',
  component: VLessonCard,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLessonCard },
  setup() {
    return { args };
  },
  template: '<VLessonCard v-bind="args" />',
});

export const CallWithVideo = {
  render: Template,
  args: {
    lesson: LESSON_CALL,
  },
};

export const CallWithoutVideo = {
  render: Template,
  args: {
    lesson: { ...LESSON_CALL, call: UPCOMING_CALL } satisfies Lesson,
  },
};

export const CallWithRutubeRecommended = {
  render: Template,
  args: {
    lesson: {
      ...LESSON_CALL,
      call: {
        ...CALL,
        recommended_video_provider: RecommendedVideoProviderEnum.rutube,
      },
    } satisfies Lesson,
  },
};

export const HomeworkWithCrosschecks = {
  render: Template,
  args: {
    lesson: LESSON_HOMEWORK,
  },
};

export const HomeworkWithoutCrosschecks = {
  render: Template,
  args: {
    lesson: LESSON_HOMEWORK_NOT_SENT,
  },
};

export const HomeworkWithoutDeadline = {
  render: Template,
  args: {
    lesson: {
      ...LESSON_HOMEWORK_NOT_SENT,
      question: { ...LESSON_HOMEWORK_NOT_SENT.question, deadline: null },
    } satisfies Lesson,
  },
};

export const MaterialLesson = {
  render: Template,
  args: {
    lesson: LESSON_MATERIAL,
  },
};

export const MaterialWithLongTitle = {
  render: Template,
  args: {
    lesson: {
      ...LESSON_MATERIAL,
      material: {
        id: MATERIAL.id,
        title:
          'Дополнительные материалы: как договориться с бизнесом о границах сервисов, если у вас уже есть монолит на миллион строк',
      },
    } satisfies Lesson,
  },
};
