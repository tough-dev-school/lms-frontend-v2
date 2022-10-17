import { describe, expect, test, beforeEach } from 'vitest';
import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import ProfileMenu from './ProfileMenu.vue';
import useUser from '@/stores/user';
import useAuth from '@/stores/auth';
import { faker } from '@faker-js/faker';
import { vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

const routerPushMock = vi.fn();

// vue-router/dist/vue-router.mjs import path is used instead of vue-router because of vue-router issue.
// We should change path vue-router when it is fixed.
// https://github.com/vuejs/router/issues/1466
vi.mock('vue-router/dist/vue-router.mjs', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe('ProfileMenu', () => {
  let wrapper;
  let user;
  let auth;

  beforeEach(() => {
    wrapper = shallowMount(ProfileMenu, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    user = useUser();
    user.username = faker.internet.email();
    user.first_name = faker.name.firstName();
    user.last_name = faker.name.lastName();

    auth = useAuth();
  });

  const getProfileLinkWrapper = () => {
    const links = wrapper.findAllComponents(RouterLinkStub);
    return links.find((link) => link.attributes()['data-testid'] === 'profile');
  };

  const getButtonWrapper = () => {
    return wrapper.find('[data-testid="button"]');
  };

  const getAvatarWrapper = () => {
    return wrapper.getComponent('[data-testid="avatar"]');
  };

  const getNameWrapper = () => {
    return wrapper.find('[data-testid="name"]');
  };

  const getUsernameWrapper = () => {
    return wrapper.find('[data-testid="username"]');
  };

  const getMenuWrapper = () => {
    return wrapper.find('[data-testid="menu"]');
  };

  const getLogoutWrapper = () => {
    return wrapper.find('[data-testid="logout"]');
  };

  const getMaterialsWrapper = () => {
    return wrapper.findAll('[data-testid="material"]');
  };

  const getMaterialWrapper = () => {
    return wrapper.find('[data-testid="material"]');
  };

  test('Click on profile toggles menu', async () => {
    await getButtonWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBeTruthy();

    await getButtonWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBeFalsy();
  });

  test.todo('Click outside profile should close menu');

  test('Avatar should have correct props', () => {
    expect(getAvatarWrapper().props().name).toBe(user.first_name);
    expect(getAvatarWrapper().props().surname).toBe(user.last_name);
  });

  test('ProfileMenu displays correct name', () => {
    expect(getNameWrapper().text()).toBe(
      `${user.first_name} ${user.last_name}`,
    );
  });

  test('ProfileMenu displays correct username', () => {
    expect(getUsernameWrapper().text()).toBe(user.username);
  });

  test('Click on logout clears token', async () => {
    await getButtonWrapper().trigger('click');
    await getLogoutWrapper().trigger('click');

    expect(auth.resetAuth).toHaveBeenCalledOnce();
  });

  test('Click on profile redirects to profile', async () => {
    await getButtonWrapper().trigger('click');

    expect(getProfileLinkWrapper().props().to).toEqual({ name: 'profile' });
  });

  test('Click on logout clears token and redirects to /login', async () => {
    await getButtonWrapper().trigger('click');
    await getLogoutWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });

  test('Menu must be closed after click on profile', async () => {
    await getButtonWrapper().trigger('click');
    await getProfileLinkWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBeFalsy();
  });

  test('Menu must be closed after click on material', async () => {
    await getButtonWrapper().trigger('click');
    await getMaterialWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBeFalsy();
  });

  test('Menu must be closed after click on logout', async () => {
    await getButtonWrapper().trigger('click');
    await getLogoutWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBeFalsy();
  });
});
