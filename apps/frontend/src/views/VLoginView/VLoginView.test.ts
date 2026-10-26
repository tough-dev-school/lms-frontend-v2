import { afterEach, describe, beforeEach, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLoginView from './VLoginView.vue';
import { router, setPage } from '@/mocks/inertia';
import { i18n } from '@/i18n';
import type VLoginLink from '@/components/VLoginLink/VLoginLink.vue';
import type VLoginPassword from '@/components/VLoginPassword/VLoginPassword.vue';

describe('VLoginView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginView>>;

  beforeEach(() => {
    wrapper = mount(VLoginView, {
      shallow: true,
      props: { redirectTo: null },
      global: {
        renderStubDefaultSlot: true,
      },
    });
  });

  const getLoginLinkWrapper = () => {
    return wrapper.findComponent<typeof VLoginLink>(
      '[data-testid="login-link"]',
    );
  };
  const getLoginPasswordWrapper = () => {
    return wrapper.findComponent<typeof VLoginPassword>(
      '[data-testid="login-password"]',
    );
  };

  test('should render link login by default', () => {
    expect(getLoginLinkWrapper().exists()).toBe(true);
  });

  const getLoginErrorWrapper = () =>
    wrapper.find('[data-testid="login-error"]');

  test('explains an expired magic link', async () => {
    setPage({ props: { errors: { link: 'expired' } } });
    await wrapper.vm.$nextTick();

    expect(getLoginErrorWrapper().text()).toBe(
      i18n.global.t('login.linkExpired'),
    );
  });

  test('shows no link error after a normal visit', () => {
    expect(getLoginErrorWrapper().exists()).toBe(false);
  });

  test('should render password login if mode changed to password', async () => {
    await getLoginLinkWrapper().trigger('change');

    expect(getLoginPasswordWrapper().exists()).toBe(true);
  });

  test('passes redirectTo to the password form', async () => {
    await wrapper.setProps({ redirectTo: '/courses/1' });
    await getLoginLinkWrapper().trigger('change');

    expect(getLoginPasswordWrapper().props('redirectTo')).toBe('/courses/1');
  });

  test('should render link login if mode changed to link', async () => {
    await getLoginLinkWrapper().trigger('change');
    await getLoginPasswordWrapper().trigger('change');

    expect(getLoginLinkWrapper().exists()).toBe(true);
  });
});

describe('VLoginView with a token from the previous app version', () => {
  const LEGACY_AUTH_KEY = 'auth';

  const mountLoginView = () =>
    mount(VLoginView, {
      shallow: true,
      props: { redirectTo: '/courses/1' },
      global: { renderStubDefaultSlot: true },
    });

  afterEach(() => {
    localStorage.clear();
  });

  test('hands the token over to the server', () => {
    const post = vi.spyOn(router, 'post');
    localStorage.setItem(
      LEGACY_AUTH_KEY,
      JSON.stringify({ token: 'old-token' }),
    );

    mountLoginView();

    expect(post).toHaveBeenCalledWith(
      '/login/token',
      { token: 'old-token', redirectTo: '/courses/1' },
      { replace: true },
    );
  });

  test('forgets the token, so a rejected one is not sent again', () => {
    localStorage.setItem(
      LEGACY_AUTH_KEY,
      JSON.stringify({ token: 'old-token' }),
    );

    mountLoginView();

    expect(localStorage.getItem(LEGACY_AUTH_KEY)).toBeNull();
  });

  test.each([
    ['nothing stored', null],
    ['a logged out student', JSON.stringify({})],
    ['broken JSON', '{token'],
  ])('sends nothing for %s', (_, stored) => {
    const post = vi.spyOn(router, 'post');
    if (stored !== null) localStorage.setItem(LEGACY_AUTH_KEY, stored);

    mountLoginView();

    expect(post).not.toHaveBeenCalled();
  });
});
