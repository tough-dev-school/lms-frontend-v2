import { describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import {
  createModule,
  useLmsLessonsList,
  useLmsModulesList,
  usePurchasedCoursesList,
} from '@/api/generated';
import type { Module } from '@/api/generated';
import { useBreadcrumbSiblings } from './useBreadcrumbSiblings';

vi.mock('@/api/generated', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/generated')>();
  return {
    ...actual,
    useLmsLessonsList: vi.fn(),
    useLmsModulesList: vi.fn(),
    usePurchasedCoursesList: vi.fn(),
  };
});

const setModules = (modules: Module[]) => {
  vi.mocked(usePurchasedCoursesList).mockReturnValue({
    data: ref({ results: [] }),
  } as unknown as ReturnType<typeof usePurchasedCoursesList>);
  vi.mocked(useLmsLessonsList).mockReturnValue({
    data: ref({ results: [] }),
  } as unknown as ReturnType<typeof useLmsLessonsList>);
  vi.mocked(useLmsModulesList).mockReturnValue({
    data: ref({ results: modules }),
  } as unknown as ReturnType<typeof useLmsModulesList>);
};

describe('useBreadcrumbSiblings', () => {
  test('lists started modules', () => {
    const module = createModule({ has_started: true });
    setModules([module]);

    const { modules } = useBreadcrumbSiblings({
      courseId: faker.number.int(),
    });

    expect(modules.value.map((m) => m.name)).toEqual([module.name]);
  });

  test('hides modules that have not started yet', () => {
    const started = createModule({ has_started: true });
    const upcoming = createModule({ has_started: false });
    setModules([started, upcoming]);

    const { modules } = useBreadcrumbSiblings({
      courseId: faker.number.int(),
    });

    expect(modules.value.map((m) => m.name)).toEqual([started.name]);
  });
});
