import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
import {
  COURSE,
  COURSE_WITH_LONG_NAME,
  MODULE_RESOURCES,
  QUESTION,
} from '@/mocks/courses';
import { urls } from '@/urls';

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

const MY_COURSES: Breadcrumb = { name: 'Мои курсы', href: urls.courses() };

export const Default = {
  render: Template,
  args: {
    items: [
      MY_COURSES,
      {
        name: COURSE.name,
        href: urls.course(COURSE.id),
      },
      {
        name: MODULE_RESOURCES.name,
        href: urls.module(COURSE.id, MODULE_RESOURCES.id),
      },
      {
        name: QUESTION.name,
        href: urls.homework(QUESTION.slug),
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
        href: urls.course(COURSE_WITH_LONG_NAME.id),
      },
      {
        name: 'Найм: как написать вакансию, на которую откликнутся сильные разработчики, а не только рекрутёры',
        href: urls.module(COURSE_WITH_LONG_NAME.id, 41),
      },
    ] satisfies Breadcrumb[],
  },
};
