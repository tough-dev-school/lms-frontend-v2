import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VModuleView from './VModuleView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockCourse } from '@/mocks/mockCourse';
import { mockModule } from '@/mocks/mockModule';
import { mockQuestion } from '@/mocks/mockQuestion';
import { studiesKeys, lmsKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import type {
  Lesson,
  RecommendedVideoProviderEnum,
} from '@/api/generated/generated-api';

export default {
  title: 'App/VModuleView',
  component: VModuleView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
  args: {
    courseId: 1,
    moduleId: 1,
  },
} as Meta;

const STATIC_COURSE = mockCourse({
  id: 1,
  name: 'Асинхронная архитектура',
});

const STATIC_MODULE = mockModule({
  id: 1,
  name: 'Введение в асинхронную архитектуру',
  text: '<p>Добро пожаловать в модуль по асинхронной архитектуре. В этом модуле мы изучим основные принципы и паттерны асинхронного программирования.</p>',
});

const STATIC_LESSONS: Lesson[] = [
  {
    id: 1,
    homework: {
      is_sent: false,
    },
    question: mockQuestion({
      slug: 'intro-async-arch',
      name: 'Введение в асинхронную архитектуру',
      markdown_text: '## Введение\n\nВопросы по материалу лекции.',
      deadline: '2024-01-20T23:59:00Z',
    }),
    call: {
      name: 'Введение в асинхронную архитектуру',
      description: 'Обзор основных принципов и подходов',
      url: 'https://example.com/call-1',
      datetime: '2024-01-15T10:00:00Z',
      video: [
        {
          provider: 'youtube',
          embed: 'https://www.youtube.com/embed/abc123',
          src: 'https://www.youtube.com/watch?v=abc123',
        },
      ],
      recommended_video_provider:
        'youtube' as RecommendedVideoProviderEnum.Youtube,
    },
  },
  {
    id: 2,
    homework: {
      is_sent: false,
    },
    question: mockQuestion({
      slug: 'async-patterns',
      name: 'Паттерны асинхронного программирования',
      markdown_text:
        '## Паттерны асинхронного программирования\n\nИзучение основных паттернов.',
      deadline: '2024-01-30T23:59:00Z',
    }),
    material: {
      id: 'material-async-patterns',
      title: 'Паттерны асинхронного программирования',
    },
  },
  {
    id: 3,
    homework: {
      is_sent: false,
    },
    question: mockQuestion({
      name: 'Event Sourcing',
      slug: 'event-sourcing',
      markdown_text: '## Event Sourcing\n\nРеализуйте паттерн Event Sourcing.',
      deadline: '2024-02-01T23:59:00Z',
    }),
  },
];

const Template: StoryFn = (args) => ({
  components: { VModuleView },
  setup() {
    const queryClient = useQueryClient();

    if (args.studies) {
      queryClient.setQueryData(studiesKeys.lists(), args.studies);
    }
    if (args.module) {
      queryClient.setQueryData(lmsKeys.module(args.moduleId), args.module);
    }
    if (args.lessons !== undefined) {
      queryClient.setQueryData(
        lmsKeys.moduleLessons(args.moduleId),
        args.lessons,
      );
    }

    return { args };
  },
  template: '<VModuleView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    studies: [STATIC_COURSE],
    module: STATIC_MODULE,
    lessons: STATIC_LESSONS,
  },
};

export const Empty = {
  render: Template,
  args: {
    studies: [STATIC_COURSE],
    module: STATIC_MODULE,
    lessons: [],
  },
};

export const WithoutModuleText = {
  render: Template,
  args: {
    studies: [STATIC_COURSE],
    module: mockModule({
      id: 1,
      name: 'Модуль без описания',
      text: null,
    }),
    lessons: STATIC_LESSONS,
  },
};
