import { describe, test, beforeEach, expect, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useStudies from './studies';
import { getStudies } from '@/api/studies';
import { mockStudy } from '@/mocks/mockStudy';
import { faker } from '@faker-js/faker';

vi.mock('@/api/studies', () => {
  return {
    getStudies: vi.fn(),
  };
});

describe('studies store', () => {
  let studies: ReturnType<typeof useStudies>;

  beforeEach(() => {
    setActivePinia(createPinia());
    studies = useStudies();
  });

  test('studies are initially empty', () => {
    expect(studies.items).toHaveLength(0);
  });

  test('getData calls studies', async () => {
    await studies.getData();

    expect(getStudies).toHaveBeenCalledOnce();
  });

  test('getData sets items', async () => {
    const studiesData = faker.helpers.multiple(mockStudy, { count: 3 });
    (getStudies as ReturnType<typeof vi.fn>).mockResolvedValue(studiesData);

    await studies.getData();

    expect(studies.items).toStrictEqual(studiesData);
  });
});
