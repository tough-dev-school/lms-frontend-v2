import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLoginResetView from './VLoginResetView.vue';
import VButton from '@/components/VButton.vue';
import VTextInput from '@/components/VTextInput.vue';
import { faker } from '@faker-js/faker';
import useAuth from '@/stores/auth';
import { createTestingPinia } from '@pinia/testing';

const defaultProps = {};

const routerPushMock = vi.fn();

vi.mock('vue-router/dist/vue-router.mjs', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

const email = faker.internet.email();

describe('VLoginResetView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginResetView>>;
  let auth: ReturnType<typeof useAuth>;

  beforeEach(() => {
    wrapper = mount(VLoginResetView, {
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

  const getEmailWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="email"]');
  const getSendWrapper = () =>
    wrapper.findComponent<typeof VButton>('[data-testid="send"]');
  const getPasswordWrapper = () =>
    wrapper.findComponent<typeof VButton>('[data-testid="password"]');

  const typeInEmail = async () => {
    await getEmailWrapper().vm.$emit('update:modelValue', email);
  };

  test('click on send calls requestReset', async () => {
    await typeInEmail();

    await getSendWrapper().vm.$emit('click');

    expect(auth.requestReset).toHaveBeenCalledOnce();
    expect(auth.requestReset).toHaveBeenCalledWith(email);
  });

  test.todo('click on enter calls requestReset');

  test('button is enabled if email is not empty', async () => {
    await typeInEmail();

    expect(getSendWrapper().attributes('disabled')).toBe('false');
  });

  test('button is disabled if email is empty', async () => {
    expect(getSendWrapper().attributes('disabled')).toBe('true');
  });

  test('enter is disabled if email is empty', async () => {
    expect(auth.requestReset).not.toHaveBeenCalled();
  });

  test('click on password button returns to login', async () => {
    await getPasswordWrapper().vm.$emit('click');

    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });
});
