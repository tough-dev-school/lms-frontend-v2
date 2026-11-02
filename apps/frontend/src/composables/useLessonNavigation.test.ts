import { describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import {
  createCall,
  createLesson,
  createNotionMaterial,
  createQuestion,
  useLmsLessonsList,
} from '@/api/generated';
import type { Lesson } from '@/api/generated';
import { useLessonNavigation } from './useLessonNavigation';

vi.mock('@/api/generated', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/generated')>();
  return {
    ...actual,
    useLmsLessonsList: vi.fn(),
  };
});

// createLesson fills every part and reseeds faker, so ids come from a counter and each helper keeps only one part
let nextId = 1;
const lessonBase = () => ({
  id: nextId++,
  material: undefined,
  question: undefined,
  call: undefined,
});

const createMaterialLesson = (): Lesson =>
  createLesson({
    ...lessonBase(),
    material: createNotionMaterial({ id: `material-${nextId}` }),
  });

const createHomeworkLesson = (): Lesson =>
  createLesson({
    ...lessonBase(),
    question: createQuestion({ slug: `question-${nextId}` }),
  });

const createCallLesson = (): Lesson =>
  createLesson({ ...lessonBase(), call: createCall() });

const materialPage = (lesson: Lesson) => ({
  name: 'materials',
  params: { materialId: lesson.material?.id },
});

const homeworkPage = (lesson: Lesson) => ({
  name: 'homework',
  params: { questionId: lesson.question?.slug },
});

const getPageId = (lesson: Lesson) =>
  lesson.material?.id ?? lesson.question?.slug ?? '';

const navigate = (lessons: Lesson[], current: Lesson) => {
  vi.mocked(useLmsLessonsList).mockReturnValue({
    data: ref({ results: lessons }),
  } as unknown as ReturnType<typeof useLmsLessonsList>);

  return useLessonNavigation({
    moduleId: faker.number.int(),
    pageId: getPageId(current),
  });
};

describe('useLessonNavigation', () => {
  test('leads from material to homework', () => {
    const material = createMaterialLesson();
    const homework = createHomeworkLesson();

    const { nextTo } = navigate([material, homework], material);

    expect(nextTo.value).toEqual(homeworkPage(homework));
  });

  test('leads from homework back to material', () => {
    const material = createMaterialLesson();
    const homework = createHomeworkLesson();

    const { previousTo } = navigate([material, homework], homework);

    expect(previousTo.value).toEqual(materialPage(material));
  });

  test('skips calls because they have no page', () => {
    const first = createMaterialLesson();
    const call = createCallLesson();
    const last = createMaterialLesson();

    const { nextTo } = navigate([first, call, last], first);

    expect(nextTo.value).toEqual(materialPage(last));
  });

  test('has no previous page for the first lesson', () => {
    const first = createMaterialLesson();
    const last = createMaterialLesson();

    const { previousTo } = navigate([first, last], first);

    expect(previousTo.value).toBeUndefined();
  });

  test('has no next page for the last lesson', () => {
    const first = createMaterialLesson();
    const last = createMaterialLesson();

    const { nextTo } = navigate([first, last], last);

    expect(nextTo.value).toBeUndefined();
  });

  test('has no arrows when the lesson is not in the module', () => {
    const lessons = [createMaterialLesson(), createMaterialLesson()];

    const { previousTo, nextTo } = navigate(lessons, createMaterialLesson());

    expect(previousTo.value).toBeUndefined();
    expect(nextTo.value).toBeUndefined();
  });
});
