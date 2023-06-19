import { describe, expect, test, beforeEach } from 'vitest';
import { RouterLinkStub, mount, VueWrapper } from '@vue/test-utils';
import VProfileMenu from '@/components/VProfileMenu.vue';
import useUser from '@/stores/user';
import useAuth from '@/stores/auth';
import type VAvatar from '@/components/VAvatar.vue';
import { faker } from '@faker-js/faker';
import { vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import useStudies from '@/stores/studies';
import { getStudiesData } from '@/mocks/studies';

const routerPushMock = vi.fn();

// vue-router/dist/vue-router.mjs import path is used instead of vue-router because of vue-router issue.
// We should change path vue-router when it is fixed.
// https://github.com/vuejs/router/issues/1466
vi.mock('vue-router/dist/vue-router.mjs', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe('VProfileMenu', () => {
  let wrapper: VueWrapper;
  let user: ReturnType<typeof useUser>;
  let auth: ReturnType<typeof useAuth>;
  let studies: ReturnType<typeof useStudies>;

  beforeEach(() => {
    wrapper = mount(VProfileMenu, {
      shallow: true,
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
    user.$patch({
      username: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });

    studies = useStudies();
    studies.$patch({
      items: getStudiesData(3),
    });

    auth = useAuth();
  });

  const getSettingsWrapper = () => {
    return wrapper.find('[data-testid*="settings"]');
  };

  const getHomeWrapper = () => {
    return wrapper.find('[data-testid="home"]');
  };

  const getButtonWrapper = () => {
    return wrapper.find('[data-testid="button"]');
  };

  const getAvatarWrapper = () => {
    return wrapper.findComponent<typeof VAvatar>('[data-testid="avatar"]');
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

  const getCertificateWrapper = () => {
    return wrapper.find('[data-testid="certificate"]');
  };

  const getMaterialsWrapper = () => {
    return wrapper.findAll('[data-testid*="material"]');
  };

  const getMaterialWrapper = () => {
    return wrapper.find('[data-testid*="material"]');
  };

  test('Click on profile toggles menu', async () => {
    await getButtonWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBe(true);

    await getButtonWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBe(false);
  });

  test('Profile is highlighted when opened', async () => {
    await getButtonWrapper().trigger('click');

    expect(getButtonWrapper().classes('VProfileMenu__Button_Active')).toBe(
      true,
    );
  });

  test.todo('Click outside profile should close menu');

  test('VAvatar should have correct props', () => {
    expect(getAvatarWrapper().props().firstName).toBe(user.firstName);
    expect(getAvatarWrapper().props().lastName).toBe(user.lastName);
  });

  test('Displays correct name', () => {
    expect(getNameWrapper().text()).toBe(user.name);
  });

  test('Displays correct username', () => {
    expect(getUsernameWrapper().text()).toBe(user.username);
  });

  test('Click on home opens home', async () => {
    await getButtonWrapper().trigger('click');

    await getHomeWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'home' });
  });

  test('Click on settings opens settings', async () => {
    await getButtonWrapper().trigger('click');

    await getSettingsWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'settings' });
  });

  test('Click on logout clears token', async () => {
    await getButtonWrapper().trigger('click');
    await getLogoutWrapper().trigger('click');

    expect(auth.resetAuth).toHaveBeenCalledOnce();
  });

  test('Click on logout opens login', async () => {
    await getButtonWrapper().trigger('click');
    await getLogoutWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });

  test('Menu must be closed after click on item', async () => {
    await getButtonWrapper().trigger('click');
  });

  test('Has link to certificates if no needed data', async () => {
    await getButtonWrapper().trigger('click');

    user.$patch({
      firstName: undefined,
      firstNameEn: undefined,
      lastName: undefined,
      lastNameEn: undefined,
    });

    expect(getCertificateWrapper().exists()).toBe(true);
  });

  test('Has no link to certificates if has needed data', async () => {
    user.$patch({
      firstName: faker.name.firstName(),
      firstNameEn: faker.name.lastName(),
      lastName: faker.name.firstName(),
      lastNameEn: faker.name.lastName(),
    });
    await getButtonWrapper().trigger('click');

    expect(getCertificateWrapper().exists()).toBe(false);
  });

  test('Link to certificates opens certificates', async () => {
    await getButtonWrapper().trigger('click');

    await getCertificateWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(routerPushMock).toHaveBeenCalledWith({
      name: 'settings',
      hash: '#certificate',
    });
  });

  test('Has correct number of materials', async () => {
    const NUMBER_OF_MATERIALS = 2;

    studies.$patch({
      items: getStudiesData(NUMBER_OF_MATERIALS),
    });

    await getButtonWrapper().trigger('click');
    const materials = getMaterialsWrapper();

    expect(materials).toHaveLength(NUMBER_OF_MATERIALS);
  });

  test('Has max of 3 materials', async () => {
    studies.$patch({ items: getStudiesData(10) });

    await getButtonWrapper().trigger('click');
    const materials = getMaterialsWrapper();

    expect(materials).toHaveLength(3);
  });

  test('Click on material opens material', async () => {
    await getButtonWrapper().trigger('click');
    await getMaterialWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(routerPushMock).toHaveBeenCalledWith({
      name: 'materials',
      params: { id: studies.items[0].homePageSlug },
    });
  });
});
