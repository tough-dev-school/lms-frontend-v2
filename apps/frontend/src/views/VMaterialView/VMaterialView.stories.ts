import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VMaterialView from './VMaterialView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  lmsLessonsListQueryKey,
  materialsRetrieveQueryKey,
  materialsStatusRetrieveQueryKey,
  usersMeRetrieveQueryKey,
} from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import type { Lesson, MaterialSerilizer } from '@/api/generated';
import { mockNotionMaterial } from '@/mocks/mockNotionMaterial';
import {
  BREADCRUMBS,
  LESSONS,
  LESSON_CALL,
  LESSON_HOMEWORK,
  LESSON_HOMEWORK_NOT_SENT,
  LESSON_MATERIAL,
  MATERIAL,
  MODULE_RESOURCES,
} from '@/mocks/courses';
import { STAFF } from '@/mocks/users';

export default {
  title: 'App/VMaterialView',
  component: VMaterialView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const MATERIAL_DATA: MaterialSerilizer = {
  breadcrumbs: BREADCRUMBS,
  content: mockNotionMaterial(),
};

const Template: StoryFn = (args) => ({
  components: { VMaterialView },
  setup() {
    useQueryClient().setQueryData(
      materialsRetrieveQueryKey(args.materialId),
      args.material,
    );
    return { args };
  },
  template: '<VMaterialView :material-id="args.materialId" />',
});

export const Default = {
  render: Template,
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
  },
};

// Staff can request a fresh copy of the page from Notion
export const AsStaff = {
  render: Template,
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
  },
  decorators: [
    () => ({
      setup() {
        const queryClient = useQueryClient();
        queryClient.setQueryData(usersMeRetrieveQueryKey(), STAFF);
        queryClient.setQueryData(materialsStatusRetrieveQueryKey(MATERIAL.id), {
          fetch_started: '2025-11-12T08:30:12Z',
          fetch_complete: '2025-11-12T08:30:19Z',
        });
      },
      template: '<story />',
    }),
  ],
};

export const Empty = {
  render: Template,
  args: {
    materialId: 'not-found-material-id',
    material: null,
  },
};

const lessonsDecorator = (lessons: Lesson[]) => () => ({
  setup() {
    useQueryClient().setQueryData(
      lmsLessonsListQueryKey({ module: MODULE_RESOURCES.id, page_size: 1000 }),
      { count: lessons.length, next: null, previous: null, results: lessons },
    );
  },
  template: '<story />',
});

export const WithHomework = {
  render: Template,
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
  },
  decorators: [lessonsDecorator(LESSONS)],
};

// With several homeworks in module there is no way to tell which one to link
export const WithSeveralHomeworks = {
  render: Template,
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
  },
  decorators: [lessonsDecorator([...LESSONS, LESSON_HOMEWORK_NOT_SENT])],
};

const LESSON_MATERIAL_BEFORE: Lesson = {
  id: 105,
  material: {
    id: 'a5f3c2d1-7b8e-4f6a-9c0d-1e2f3a4b5c6d',
    title: 'Что такое REST',
  },
};

const LESSON_MATERIAL_AFTER: Lesson = {
  id: 106,
  material: {
    id: 'b6e4d3c2-8c9f-4a7b-8d1e-2f3a4b5c6d7e',
    title: 'Версионирование API',
  },
};

export const FirstInModule = {
  render: Template,
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
  },
  decorators: [
    lessonsDecorator([
      LESSON_CALL,
      LESSON_MATERIAL,
      LESSON_MATERIAL_AFTER,
      LESSON_HOMEWORK,
    ]),
  ],
};

export const MiddleOfModule = {
  render: Template,
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
  },
  decorators: [
    lessonsDecorator([
      LESSON_MATERIAL_BEFORE,
      LESSON_CALL,
      LESSON_MATERIAL,
      LESSON_MATERIAL_AFTER,
      LESSON_HOMEWORK,
    ]),
  ],
};

export const LastInModule = {
  render: Template,
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
  },
  decorators: [
    lessonsDecorator([
      LESSON_MATERIAL_BEFORE,
      LESSON_MATERIAL,
      LESSON_CALL,
      LESSON_HOMEWORK,
    ]),
  ],
};
