import { vi, describe, beforeEach, expect, test } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLoginChangeView from './VLoginChangeView.vue';
import VPasswordSettings from '@/components/VPasswordResetForm/VPasswordResetForm.vue';
import { faker } from '@faker-js/faker';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthPasswordResetConfirmCreate } from '@/api/generated/hooks';

const uid = faker.string.uuid();
const token = faker.string.uuid();

const defaultProps = {
  uid,
  token,
};

const routerPushMock = vi.fn();

vi.mock('vue-router');
vi.mock('@/api');
vi.mock('@tanstack/vue-query');

describe('VLoginChangeView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginChangeView>>;
  let confirmPasswordReset: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    confirmPasswordReset = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      push: routerPushMock,
    } as any);

    vi.mocked(useAuthPasswordResetConfirmCreate).mockReturnValue({
      mutateAsync: confirmPasswordReset,
      isPending: ref(false),
    } as any);

    wrapper = mount(VLoginChangeView, {
      shallow: true,
      props: defaultProps,
      global: {
        renderStubDefaultSlot: true,
      },
    });
  });

  const getPasswordSettingsWrapper = () =>
    wrapper.findComponent(VPasswordSettings);

  test('calls confirmPasswordResetMutation', () => {
    const password = faker.internet.password();

    getPasswordSettingsWrapper().vm.$emit('save', password);

    expect(confirmPasswordReset).toHaveBeenCalled();
    expect(confirmPasswordReset).toHaveBeenCalledWith({
      new_password1: password,
      new_password2: password,
      uid,
      token,
    });
  });

  test('navigates to /login on save', async () => {
    getPasswordSettingsWrapper().vm.$emit('save');

    // wait for the mutation to complete
    await flushPromises();

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });
});
