import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
import VPillHomework from '@/components/VPillHomework/VPillHomework.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { COURSE, LESSON_HOMEWORK, MODULE_RESOURCES } from '@/mocks/courses';

export default {
  title: 'Layouts/VLoggedLayout',
  component: VLoggedLayout,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const BREADCRUMBS = [
  { name: 'Мои курсы', to: { name: 'courses' } },
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
];

const Template: StoryFn = (args) => ({
  components: { VLoggedLayout },
  setup() {
    return { args };
  },
  template: `
    <VLoggedLayout v-bind="args">
      <p>Содержимое страницы.</p>
    </VLoggedLayout>
  `,
});

export const Default = {
  render: Template,
  args: {
    title: 'Мои курсы',
  },
};

export const WithBreadcrumbs = {
  render: Template,
  args: {
    title: MODULE_RESOURCES.name,
    breadcrumbs: BREADCRUMBS,
  },
};

export const WithoutTitle = {
  render: Template,
  args: {},
};

export const WithPill: StoryFn = () => ({
  components: { VLoggedLayout, VPillHomework },
  setup() {
    return { breadcrumbs: BREADCRUMBS, lesson: LESSON_HOMEWORK };
  },
  template: `
    <VLoggedLayout :title="lesson.question.name" :breadcrumbs="breadcrumbs">
      <template #pill>
        <VPillHomework :lesson="lesson" />
      </template>
      <p>Содержимое страницы.</p>
    </VLoggedLayout>
  `,
});
