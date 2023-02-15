import { describe, test, beforeEach, expect, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useMaterials from './materials';
import { getMaterial } from '@/api/materials';
import { getMaterialsData } from '@/mocks/materials';
import { faker } from '@faker-js/faker';

vi.mock('@/api/materials', () => {
  return {
    getMaterial: vi.fn(),
  };
});

describe('materials store', () => {
  let materials: ReturnType<typeof useMaterials>;

  beforeEach(() => {
    setActivePinia(createPinia());
    materials = useMaterials();
  });

  test('materials are initially empty', () => {
    expect(materials.material).toBe(undefined);
  });

  test(' getData to call get materials', async () => {
    await materials.getData(faker.datatype.uuid());

    expect(getMaterial).toHaveBeenCalledOnce();
  });

  test('getData sets material', async () => {
    const materialsData = getMaterialsData();
    (getMaterial as ReturnType<typeof vi.fn>).mockResolvedValue(materialsData);

    await materials.getData(faker.datatype.uuid());

    expect(materials.material).toStrictEqual(materialsData);
  });
});
