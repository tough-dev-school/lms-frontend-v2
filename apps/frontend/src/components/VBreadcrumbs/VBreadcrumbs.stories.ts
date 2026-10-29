import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
import {
  COURSE,
  COURSE_WITH_LONG_NAME,
  MODULE_RESOURCES,
  QUESTION,
} from '@/mocks/courses';

export default {
  title: 'UI/VBreadcrumbs',
  component: VBreadcrumbs,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VBreadcrumbs },
  setup() {
    return { args };
  },
  template: '<VBreadcrumbs v-bind="args" />',
});

const MY_COURSES: Breadcrumb = {
  name: 'Мои курсы',
  label: '~',
  to: { name: 'courses' },
};

export const Default = {
  render: Template,
  args: {
    items: [
      MY_COURSES,
      {
        name: COURSE.name,
        to: { name: 'course', params: { courseId: COURSE.id } },
      },
      {
        name: MODULE_RESOURCES.name,
        to: {
          name: 'module',
          params: { courseId: COURSE.id, moduleId: MODULE_RESOURCES.id },
        },
      },
      {
        name: QUESTION.name,
        to: { name: 'homework', params: { questionId: QUESTION.slug } },
      },
    ] satisfies Breadcrumb[],
  },
};

export const Single = {
  render: Template,
  args: {
    items: [MY_COURSES],
  },
};

export const LongNames = {
  render: Template,
  args: {
    items: [
      MY_COURSES,
      {
        name: COURSE_WITH_LONG_NAME.name,
        to: { name: 'course', params: { courseId: COURSE_WITH_LONG_NAME.id } },
      },
      {
        name: 'Найм: как написать вакансию, на которую откликнутся сильные разработчики, а не только рекрутёры',
        to: {
          name: 'module',
          params: { courseId: COURSE_WITH_LONG_NAME.id, moduleId: 41 },
        },
      },
    ] satisfies Breadcrumb[],
  },
};

const MODULES: Breadcrumb[] = [
  MODULE_RESOURCES,
  { id: 42, name: 'Аутентификация и авторизация' },
  { id: 43, name: 'Версионирование и обратная совместимость' },
].map((module) => ({
  name: module.name,
  to: { name: 'module', params: { courseId: COURSE.id, moduleId: module.id } },
}));

// Chevron opens a native select with pages on the same level
export const WithSiblings = {
  render: Template,
  args: {
    items: [
      MY_COURSES,
      {
        name: COURSE.name,
        to: { name: 'course', params: { courseId: COURSE.id } },
      },
      { ...MODULES[0], siblings: MODULES },
    ] satisfies Breadcrumb[],
  },
};
