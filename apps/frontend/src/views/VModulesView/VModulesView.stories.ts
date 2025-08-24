import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VModulesView from './VModulesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockCourse } from '@/mocks/mockCourse';
import { mockModule } from '@/mocks/mockModule';
import { studiesKeys, lmsKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import { faker } from '@faker-js/faker';

export default {
  title: 'App/VModulesView',
  component: VModulesView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
  args: {
    courseId: 1,
  },
} as Meta;

const STATIC_COURSE = mockCourse({
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

const STATIC_MODULES = faker.helpers.multiple(mockModule, { count: 3 });

const Template: StoryFn = (args) => ({
  components: { VModulesView },
  setup() {
    const queryClient = useQueryClient();

    if (args.studies) {
      queryClient.setQueryData(studiesKeys.lists(), args.studies);
    }
    if (args.modules !== undefined) {
      queryClient.setQueryData(
        lmsKeys.courseModules(args.courseId),
        args.modules,
      );
    }

    return { args };
  },
  template: '<VModulesView v-bind="args" />',
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
      mockCourse({
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
