import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VPasswordSettings from './VPasswordSettings.vue';
import type VTextInput from '@/components/VTextInput/VTextInput.vue';
import useAuth from '@/stores/auth';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';
import { nextTick } from 'vue';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';
import VButton from '@/components/VButton/VButton.vue';
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
          VCard: VTransparentComponent,
          VButton: VTransparentComponent,
        },
      },
    });

    auth = useAuth();
  });

  const getPassword1Wrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="password1"]');
  const getPassword2Wrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="password2"]');

  const getSaveWrapper = () =>
    wrapper.findComponent<typeof VButton>('[data-testid="save"]');

  test('shows reset heading when no auth', () => {
    expect(wrapper.attributes('title')).toContain('Сброс пароля');
  });
  test('shows change heading when has auth', async () => {
    auth.$patch({ token: faker.string.uuid() });

    await nextTick();

    expect(wrapper.attributes('title')).toContain('Пароль');
  });

  test('sends data on save', async () => {
    const password1 = faker.string.uuid();
    const password2 = faker.string.uuid();

    getPassword1Wrapper().vm.$emit('update:modelValue', password1);
    getPassword2Wrapper().vm.$emit('update:modelValue', password2);

    getSaveWrapper().vm.$emit('click');

    expect(auth.changePassword).toHaveBeenCalledTimes(1);
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
