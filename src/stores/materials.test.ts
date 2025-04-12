import { createPinia, setActivePinia } from 'pinia';
import useMaterials from './materials';
import { getMaterial } from '@/api/materials';
import { faker } from '@faker-js/faker';
import { mockMaterial } from '@/mocks/mockMaterial';
import { vi, describe, beforeEach, expect, test } from 'vitest';

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
    await materials.getData(faker.string.uuid());

    expect(getMaterial).toHaveBeenCalledTimes(1);
  });

  test('getData sets material', async () => {
    const materialsData = mockMaterial();
    (getMaterial as ReturnType<typeof vi.fn>).mockResolvedValue(materialsData);

    await materials.getData(faker.string.uuid());

    expect(materials.material).toStrictEqual(materialsData);
  });
});
