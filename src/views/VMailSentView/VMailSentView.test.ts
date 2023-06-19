import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { VMailSentView } from '.';
import { faker } from '@faker-js/faker';
import useAuth from '@/stores/auth';

const routerPushMock = vi.fn();
const email = faker.internet.email();

vi.mock('vue-router/dist/vue-router.mjs', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
  useRoute: () => ({
    query: {
      email,
    },
  }),
}));

describe('VMailSentView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VMailSentView>>;
  let auth: ReturnType<typeof useAuth>;

  beforeEach(() => {
    wrapper = mount(VMailSentView, {
      shallow: true,
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

  const getMessageWrapper = () => {
    return wrapper.find(`[data-testid="message"]`);
  };
  const getResendWrapper = () => {
    return wrapper.find(`[data-testid="resend"]`);
  };
  const getRestartWrapper = () => {
    return wrapper.find(`[data-testid="restart"]`);
  };

  test('message contains email', () => {
    expect(getMessageWrapper().text()).toContain(email);
  });
  test('click on resend sends email', () => {
    getResendWrapper().trigger('click');

    expect(auth.loginWithEmail).toHaveBeenCalledWith(email);
  });

  test('click on restart returns to login', () => {
    getRestartWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });
});
