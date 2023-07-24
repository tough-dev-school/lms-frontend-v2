import useLoading from '@/stores/loading';
import { createPinia, setActivePinia } from 'pinia';

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
