import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLessonCard from '@/components/VLessonCard/VLessonCard.vue';
import type {
  Lesson,
  RecommendedVideoProviderEnum,
} from '@/api/generated/types';
import {
  createLesson,
  createQuestion,
  createTemporarySoonToBeDepricatedQuestion,
} from '@/api/generated/mocks';

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

// Mock data for different lesson types
const baseLesson = {
  id: 1,
};

const callWithVideo: Lesson = {
  ...baseLesson,
  ...createLesson(),
  question: createQuestion(),
  call: {
    name: 'Введение в React',
    description: 'Изучаем основы React и создаем первое приложение',
    url: 'https://example.com/call',
    datetime: '2024-01-15T10:00:00Z',
    video: [
      {
        provider: 'youtube',
        embed: 'https://www.youtube.com/embed/abc123',
        src: 'https://www.youtube.com/watch?v=abc123',
      },
      {
        provider: 'rutube',
        embed: 'https://rutube.ru/play/embed/def456',
        src: 'https://rutube.ru/video/def456',
      },
    ],
    recommended_video_provider:
      'youtube' as RecommendedVideoProviderEnum.youtube,
  },
};

const callWithoutVideo: Lesson = {
  ...baseLesson,
  ...createLesson(),
  question: createQuestion(),
  call: {
    name: 'Дизайн систем',
    description: 'Обсуждаем принципы создания дизайн систем',
    url: 'https://example.com/design-systems',
    datetime: '2024-01-20T14:00:00Z',
    video: [],
    recommended_video_provider: null,
  },
};

const homeworkWithCrosschecks: Lesson = {
  ...baseLesson,
  ...createLesson(),
  question: createQuestion(),
  homework: {
    comments: {
      comments: 10,
      hidden_before_crosscheck_completed: 2,
    },
    is_sent: true,
    crosschecks: {
      total: 5,
      checked: 3,
    },
    question: {
      ...createTemporarySoonToBeDepricatedQuestion(),
      slug: 'javascript-fundamentals',
      name: 'Основы JavaScript',
    },
  },
};

const homeworkWithoutCrosschecks: Lesson = {
  ...baseLesson,
  question: createQuestion(),
  homework: {
    comments: {
      comments: 0,
      hidden_before_crosscheck_completed: 0,
    },
    is_sent: false,
    question: {
      ...createTemporarySoonToBeDepricatedQuestion(),
      slug: 'css-layouts',
      name: 'CSS Layouts',
    },
  },
};

const materialLesson: Lesson = {
  ...baseLesson,
  ...createLesson(),
  question: createQuestion(),
  material: {
    id: 'material-123',
    title: 'Углубленное изучение Vue.js',
  },
};

export const CallWithVideo = {
  render: Template,
  args: {
    lesson: callWithVideo,
  },
};

export const CallWithoutVideo = {
  render: Template,
  args: {
    lesson: callWithoutVideo,
  },
};

export const HomeworkWithCrosschecks = {
  render: Template,
  args: {
    lesson: homeworkWithCrosschecks,
  },
};

export const HomeworkWithoutCrosschecks = {
  render: Template,
  args: {
    lesson: homeworkWithoutCrosschecks,
  },
};

export const MaterialLesson = {
  render: Template,
  args: {
    lesson: materialLesson,
  },
};

export const ComplexLesson = {
  render: Template,
  args: {
    lesson: {
      ...baseLesson,
      id: 6,
      call: {
        name: 'TypeScript в больших проектах',
        description: 'Как использовать TypeScript эффективно',
        url: 'https://example.com/typescript-advanced',
        datetime: '2024-02-01T16:00:00Z',
        video: [
          {
            provider: 'youtube',
            embed: 'https://www.youtube.com/embed/xyz789',
            src: 'https://www.youtube.com/watch?v=xyz789',
          },
        ],
        recommended_video_provider: 'youtube' as RecommendedVideoProviderEnum,
      },
      homework: {
        is_sent: true,
        crosschecks: {
          total: 8,
          checked: 6,
        },
        question: {
          slug: 'typescript-advanced',
          name: 'Продвинутый TypeScript',
          text: 'Реализуйте типизированную архитектуру',
          deadline: '2024-02-10T23:59:00Z',
        },
      },
      question: {
        ...createQuestion(),
        slug: 'typescript-advanced',
        name: 'Продвинутый TypeScript',
        text: 'Реализуйте типизированную архитектуру',
        deadline: '2024-02-10T23:59:00Z',
      },
      material: {
        id: 'material-456',
        title: 'Дополнительные материалы по TypeScript',
      },
    } as Lesson,
  },
};
