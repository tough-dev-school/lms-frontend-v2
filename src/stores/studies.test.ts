import { describe, test, beforeEach, expect, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useStudies from './studies';
import { getStudies } from '@/api/studies';
import { getStudiesData } from '@/mocks/studies';

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

  test('expect studies to be initially empty', () => {
    expect(studies.items).toHaveLength(0);
  });

  test('expect getData to call get studies', async () => {
    await studies.getData();
    expect(getStudies).toHaveBeenCalledOnce();
  });

  test('expect getData to set items', async () => {
    const studiesData = getStudiesData();

    (getStudies as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: studiesData,
    });
    await studies.getData();
    expect(studies.items).toStrictEqual(studiesData);
  });
});
