import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLogoutView from './VLogoutView.vue';
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const routerPushMock = vi.fn();

vi.mock('vue-router');
vi.mock('@/composables/useAuth');

describe('VLogoutView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLogoutView>>;
  let token = ref<string | undefined>('initial-token');

  beforeEach(() => {
    routerPushMock.mockReset();
    token = ref<string | undefined>('some-token');

    vi.mocked(useAuth).mockReturnValue({
      token,
    } as any);

    vi.mocked(useRouter).mockReturnValue({
      push: routerPushMock,
    } as any);

    wrapper = mount(VLogoutView, {
      shallow: true,
      global: {
        renderStubDefaultSlot: true,
      },
    });
  });

  test('clears auth token on mount', () => {
    expect(token.value).toBeUndefined();
  });

  test('redirects to login on mount', () => {
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });

  test('renders loading view', () => {
    expect(wrapper.find('v-loading-view-stub').exists()).toBe(true);
  });
});
