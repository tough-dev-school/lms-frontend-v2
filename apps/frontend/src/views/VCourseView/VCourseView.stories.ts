import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCourseView from './VCourseView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  createCourse,
  createModule,
  purchasedCoursesListQueryKey,
  lmsModulesListQueryKey,
} from '@/api';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  title: 'App/VCourseView',
  component: VCourseView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
  args: {
    courseId: 1,
  },
} as Meta;

const STATIC_COURSE = createCourse({
  id: 1,
  name: 'Асинхронная архитектура',
  chat: 'https://t.me/test',
  calendar_google: 'https://calendar.google.com/test',
  calendar_ios: 'https://calendar.apple.com/test',
  links: [
    { name: 'Дополнительные материалы', url: 'https://example.com' },
    { name: 'GitHub репозиторий', url: 'https://github.com/test' },
  ],
});

const STATIC_MODULES = [
  createModule({
    id: 1,
    name: 'Введение в асинхронную архитектуру',
    description: 'Основные принципы и подходы',
    text: '<p>В этом модуле мы изучим основные принципы асинхронной архитектуры и познакомимся с базовыми концепциями.</p>',
    start_date: '2024-01-15T00:00:00Z',
    has_started: true,
  }),
  createModule({
    id: 2,
    name: 'Паттерны асинхронного программирования',
    description: 'Event-driven architecture, CQRS, Event Sourcing',
    text: '<p>Изучаем основные паттерны асинхронной архитектуры: событийно-ориентированную архитектуру, CQRS и Event Sourcing.</p>',
    start_date: '2024-02-01T00:00:00Z',
    has_started: true,
  }),
  createModule({
    id: 3,
    name: 'Практическая реализация',
    description: 'Реализация асинхронных систем на практике',
    text: '<p>Применяем изученные принципы на практике, создавая реальные асинхронные системы.</p>',
    start_date: '2024-02-15T00:00:00Z',
    has_started: false,
  }),
];

const Template: StoryFn = (args) => ({
  components: { VCourseView },
  setup() {
    const queryClient = useQueryClient();

    if (args.studies) {
      queryClient.setQueryData(
        purchasedCoursesListQueryKey({ page_size: 100 }),
        { results: args.studies },
      );
    }
    if (args.modules !== undefined) {
      queryClient.setQueryData(
        lmsModulesListQueryKey({ course: args.courseId, page_size: 100 }),
        { results: args.modules },
      );
    }

    return { args };
  },
  template: '<VCourseView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    studies: [STATIC_COURSE],
    modules: STATIC_MODULES,
  },
};

export const Empty = {
  render: Template,
  args: {
    studies: [STATIC_COURSE],
    modules: [],
  },
};

export const WithoutExtraInfo = {
  render: Template,
  args: {
    studies: [
      createCourse({
        id: 1,
        name: 'Простой курс',
        chat: null,
        calendar_google: null,
        calendar_ios: null,
        links: [],
      }),
    ],
    modules: STATIC_MODULES,
  },
};
