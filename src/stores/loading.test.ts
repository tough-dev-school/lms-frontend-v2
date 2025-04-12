import { createPinia, setActivePinia } from 'pinia';
import useLoading from '@/stores/loading';
import { vi, describe, beforeEach, expect, test } from 'vitest';

describe('loading store', () => {
  let loading: ReturnType<typeof useLoading>;

  beforeEach(() => {
    setActivePinia(createPinia());
    loading = useLoading();
  });

  test('isLoading is initially false', () => {
    expect(loading.isLoading).toBe(false);
  });
});
