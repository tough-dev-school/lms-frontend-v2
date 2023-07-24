import type { VAvatar } from '@/components/VAvatar';

import { VProfileMenu } from '@/components/VProfileMenu';
import { mockStudy } from '@/mocks/mockStudy';
import useAuth from '@/stores/auth';
import useStudies from '@/stores/studies';
import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { RouterLinkStub, VueWrapper, mount } from '@vue/test-utils';

const routerPushMock = vi.fn();

vi.mock('vue-router', () => ({
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
      shallow: true,
    });

    user = useUser();
    user.$patch({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.internet.email(),
    });

    studies = useStudies();
    studies.$patch({
      items: faker.helpers.multiple(mockStudy, { count: 3 }),
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
    expect(getAvatarWrapper().props().userId).toBe(user.uuid);
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

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'home' });
  });

  test('Click on settings opens settings', async () => {
    await getButtonWrapper().trigger('click');

    await getSettingsWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'settings' });
  });

  test('Click on logout clears token', async () => {
    await getButtonWrapper().trigger('click');
    await getLogoutWrapper().trigger('click');

    expect(auth.resetAuth).toHaveBeenCalledTimes(1);
  });

  test('Click on logout opens login', async () => {
    await getButtonWrapper().trigger('click');
    await getLogoutWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledTimes(1);
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
      firstName: faker.person.firstName(),
      firstNameEn: faker.person.lastName(),
      lastName: faker.person.firstName(),
      lastNameEn: faker.person.lastName(),
    });
    await getButtonWrapper().trigger('click');

    expect(getCertificateWrapper().exists()).toBe(false);
  });

  test('Link to certificates opens certificates', async () => {
    await getButtonWrapper().trigger('click');

    await getCertificateWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({
      hash: '#certificate',
      name: 'settings',
    });
  });

  test('Has correct number of materials', async () => {
    const NUMBER_OF_MATERIALS = 2;

    studies.$patch({
      items: faker.helpers.multiple(mockStudy, { count: NUMBER_OF_MATERIALS }),
    });

    await getButtonWrapper().trigger('click');
    const materials = getMaterialsWrapper();

    expect(materials).toHaveLength(NUMBER_OF_MATERIALS);
  });

  test('Has max of 3 materials', async () => {
    studies.$patch({
      items: faker.helpers.multiple(mockStudy, { count: 10 }),
    });

    await getButtonWrapper().trigger('click');
    const materials = getMaterialsWrapper();

    expect(materials).toHaveLength(3);
  });

  test('Click on material opens material', async () => {
    await getButtonWrapper().trigger('click');
    await getMaterialWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({
      name: 'materials',
      params: { id: studies.items[0].homePageSlug },
    });
  });
});
