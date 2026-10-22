import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VModuleCard from './VModuleCard.vue';
import {
  COURSE,
  MODULE_ANALYTICS,
  MODULE_BONUS,
  MODULE_COMMUNICATION,
  MODULE_EVENT_STORMING,
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
    module: MODULE_EVENT_STORMING,
    index: 0,
  },
};

export const NotStarted = {
  render: Template,
  args: {
    module: MODULE_ANALYTICS,
    index: 1,
  },
};

export const WithLongTitle = {
  render: Template,
  args: {
    module: {
      ...MODULE_COMMUNICATION,
      name: 'Коммуникации между сервисами: синхронные вызовы, брокеры сообщений, CUD- и бизнес-события и что делать, когда брокер лежит',
      start_date: null,
    },
    index: 2,
  },
};

export const WithoutDescription = {
  render: Template,
  args: {
    module: { ...MODULE_COMMUNICATION, description: null, start_date: null },
    index: 3,
  },
};

export const MinimalContent = {
  render: Template,
  args: {
    module: MODULE_BONUS,
    index: 0,
  },
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
