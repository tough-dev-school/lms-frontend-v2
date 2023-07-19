import { createPinia, setActivePinia } from 'pinia';
import useLoading from '@/stores/loading';

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
