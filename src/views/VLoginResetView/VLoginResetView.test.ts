import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLoginResetView from './VLoginResetView.vue';
import type { VButton } from '@/components/VButton';
import type { VTextInput } from '@/components/VTextInput';
import { faker } from '@faker-js/faker';
import useAuth from '@/stores/auth';
import { createTestingPinia } from '@pinia/testing';

const defaultProps = {};

const routerPushMock = vi.fn();

vi.mock('vue-router', () => ({
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

    await getSendWrapper().trigger('submit');

    expect(auth.requestReset).toHaveBeenCalledTimes(1);
    expect(auth.requestReset).toHaveBeenCalledWith(email);
  });

  test('click on send redirects to mail-sent', async () => {
    await typeInEmail();

    await getSendWrapper().trigger('submit');

    expect(auth.requestReset).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({
      name: 'mail-sent',
      query: { email },
    });
  });

  test('button is enabled if email is not empty', async () => {
    await typeInEmail();

    expect(getSendWrapper().attributes('disabled')).toBe('false');
  });

  test('button is disabled if email is empty', async () => {
    expect(getSendWrapper().attributes('disabled')).toBe('true');
  });

  test('click on password button returns to login', async () => {
    await getPasswordWrapper().vm.$emit('click');

    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });
});
