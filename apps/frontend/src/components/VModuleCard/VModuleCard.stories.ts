import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VModuleCard from './VModuleCard.vue';
import {
  COURSE,
  LESSON_MATERIAL,
  MODULE_BONUS,
  MODULE_DOCUMENTATION,
  MODULE_ERRORS,
  MODULE_RESOURCES,
  MODULES,
} from '@/mocks/courses';

export default {
  title: 'UI/VModuleCard',
  component: VModuleCard,
  args: {
    courseId: COURSE.id,
  },
  argTypes: {
    index: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Index for determining card color',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VModuleCard },
  setup() {
    return { args };
  },
  template: '<VModuleCard v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    module: MODULE_RESOURCES,
    index: 0,
  },
};

export const NotStarted = {
  render: Template,
  args: {
    module: MODULE_DOCUMENTATION,
    index: 1,
  },
};

export const WithLongTitle = {
  render: Template,
  args: {
    module: {
      ...MODULE_ERRORS,
      name: 'Ошибки и коды ответов: что возвращать клиенту, когда запрос неправильный, ресурс занят или сервер не справляется',
      start_date: null,
    },
    index: 1,
  },
};

export const WithoutDescription = {
  render: Template,
  args: {
    module: { ...MODULE_ERRORS, description: null, start_date: null },
    index: 2,
  },
};

export const WithoutText = {
  render: Template,
  args: {
    module: { ...MODULE_RESOURCES, text: null },
    index: 3,
  },
};

export const WithStartDate = {
  render: Template,
  args: {
    module: { ...MODULE_ERRORS, start_date: '2025-01-01' },
    index: 4,
  },
};

// A started module with one lesson links straight to that lesson
export const SingleLesson = {
  render: Template,
  args: {
    module: {
      ...MODULE_RESOURCES,
      has_started: true,
      lesson_count: 1,
    },
    onlyLesson: LESSON_MATERIAL,
    index: 2,
  },
};

export const MinimalContent = {
  render: Template,
  args: {
    module: MODULE_BONUS,
    index: 0,
  },
};

// Colors cycle through four accents, eight cards show the cycle twice
export const ColorVariations = {
  render: () => ({
    components: { VModuleCard },
    setup() {
      const modules = [...MODULES, ...MODULES.slice(0, 3)]
        .slice(0, 8)
        .map((module, index) => ({
          ...module,
          id: index + 1,
          has_started: true,
          // A started module with one lesson needs that lesson to link anywhere
          lesson_count: 2,
        }));
      return { modules, courseId: COURSE.id };
    },
    template: `
      <div class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-16">
        <VModuleCard
          v-for="(module, index) in modules"
          :key="module.id"
          :module="module"
          :course-id="courseId"
          :index="index"
        />
      </div>
    `,
  }),
};

export const CourseModules = {
  render: () => ({
    components: { VModuleCard },
    setup() {
      return { modules: MODULES, courseId: COURSE.id };
    },
    template: `
      <div class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-16">
        <VModuleCard
          v-for="(module, index) in modules"
          :key="module.id"
          :module="module"
          :course-id="courseId"
          :index="index"
        />
      </div>
    `,
  }),
};

// The description is plain text, HTML in it shows as is
export const WithRichDescription = {
  render: Template,
  args: {
    module: {
      ...MODULE_RESOURCES,
      description: `
        <p>В этом модуле <strong>три темы</strong>:</p>
        <ul>
          <li>Ресурсы и их поля</li>
          <li>Эндпоинты и методы</li>
          <li>Поиск и фильтры</li>
        </ul>
        <p>Всё разбираем на примере сервиса выдачи книг.</p>
      `,
    },
    index: 1,
  },
};
