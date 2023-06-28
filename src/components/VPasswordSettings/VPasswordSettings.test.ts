import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { VPasswordSettings } from '.';
import type { VTextInput } from '@/components/VTextInput';
import useAuth from '@/stores/auth';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';
import { nextTick } from 'vue';

const defaultProps = {
  uid: faker.string.uuid(),
  token: faker.string.uuid(),
};

describe('VPasswordSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VPasswordSettings>>;
  let auth: ReturnType<typeof useAuth>;

  beforeEach(() => {
    wrapper = mount(VPasswordSettings, {
      shallow: true,
      props: defaultProps,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          VCard: false,
        },
      },
    });

    auth = useAuth();
  });

  const getResetHeadingWrapper = () =>
    wrapper.find('[data-testid="reset-heading"]');
  const getChangeHeadingWrapper = () =>
    wrapper.find('[data-testid="change-heading"]');
  const getPassword1Wrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="password1"]');
  const getPassword2Wrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="password2"]');

  const getSaveWrapper = () => wrapper.find('[data-testid="save"]');

  test('shows reset heading when no auth', () => {
    expect(getResetHeadingWrapper().exists()).toBe(true);
  });
  test('shows change heading when has auth', async () => {
    auth.$patch({ token: faker.string.uuid() });

    await nextTick();

    expect(getChangeHeadingWrapper().exists()).toBe(true);
  });

  test('sends data on save', async () => {
    const password1 = faker.string.uuid();
    const password2 = faker.string.uuid();

    getPassword1Wrapper().vm.$emit('update:modelValue', password1);
    getPassword2Wrapper().vm.$emit('update:modelValue', password2);

    await getSaveWrapper().trigger('click');

    expect(auth.changePassword).toHaveBeenCalledOnce();
    expect(auth.changePassword).toHaveBeenCalledWith({
      newPassword1: password1,
      newPassword2: password2,
      uid: defaultProps.uid,
      token: defaultProps.token,
    });
  });

  test('emit save on save', async () => {
    await getSaveWrapper().trigger('click');

    expect(wrapper.emitted('save')).toHaveLength(1);
  });
});
