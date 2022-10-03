import { describe, expect, test, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ProfileMenu from './ProfileMenu.vue';
import useUser from '@/stores/user';
import useAuth from '@/stores/auth';
import { faker } from '@faker-js/faker';
import { vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

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
        stubs: ['RouterLink', 'RouterView'],
      },
    });

    user = useUser();
    user.username = faker.internet.email();
    user.first_name = faker.name.firstName();
    user.last_name = faker.name.lastName();

    auth = useAuth();
    auth.token = faker.datatype.uuid();
  });

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

  test('Click on profile toggles menu', async () => {
    await getButtonWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBeTruthy();
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

  test.todo('Click on profile redirects to profile');

  test.todo('Click on logout clears token and redirects to /login');
});
