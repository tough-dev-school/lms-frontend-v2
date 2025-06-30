import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VPasswordSettings from './VPasswordSettings.vue';
import type VTextInput from '@/components/VTextInput/VTextInput.vue';
import useAuth from '@/stores/auth';
import { faker } from '@faker-js/faker';
import { nextTick } from 'vue';
import VButton from '@/components/VButton/VButton.vue';

type MockedAuth = ReturnType<typeof useAuth> & {
  changePassword: ReturnType<typeof vi.fn>;
};

const defaultProps = {
  uid: faker.string.uuid(),
  token: faker.string.uuid(),
};

describe('VPasswordSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VPasswordSettings>>;
  let auth: MockedAuth;

  beforeEach(() => {
    wrapper = mount(VPasswordSettings, {
      shallow: true,
      props: defaultProps,
      global: {
        renderStubDefaultSlot: true,
        stubs: {
          VCard: {
            template:
              '<div><slot /><slot name="footer" /><div data-testid="title">{{ title }}</div></div>',
            props: ['title'],
          },
          VTextInput: false,
          VButton: false,
        },
      },
    });

    auth = useAuth() as MockedAuth;
  });

  const getPassword1Wrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="password1"]');
  const getPassword2Wrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="password2"]');
  const getSaveWrapper = () =>
    wrapper.findComponent<typeof VButton>('[data-testid="save"]');

  test('shows reset heading when no auth', () => {
    const title = wrapper.find('[data-testid="title"]').text();
    expect(title).toBe('Сброс пароля');
  });

  test('shows change heading when has auth', async () => {
    auth.$patch({ token: faker.string.uuid() });
    await nextTick();
    const title = wrapper.find('[data-testid="title"]').text();
    expect(title).toBe('Пароль');
  });

  test('sends data on save', async () => {
    const password1 = faker.string.uuid();
    const password2 = faker.string.uuid();

    await getPassword1Wrapper().vm.$emit('update:modelValue', password1);
    await getPassword2Wrapper().vm.$emit('update:modelValue', password2);
    await getSaveWrapper().trigger('click');

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
