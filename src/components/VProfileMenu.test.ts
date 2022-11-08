import { describe, expect, test, beforeEach } from 'vitest';
import { RouterLinkStub, shallowMount, VueWrapper } from '@vue/test-utils';
import ProfileMenu from './ProfileMenu.vue';
import useUser from '@/stores/user';
import useAuth from '@/stores/auth';
import type Avatar from '@/components/Avatar.vue';
import { faker } from '@faker-js/faker';
import { vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import type { RouterLink } from 'vue-router';
import useStudies from '@/stores/studies';

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
  let wrapper: VueWrapper;
  let user: ReturnType<typeof useUser>;
  let auth: ReturnType<typeof useAuth>;
  let studies: ReturnType<typeof useStudies>;

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
    user.$patch({
      username: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });

    studies = useStudies();
    studies.$patch({
      items: [...Array(3)].map(() => ({
        id: faker.datatype.number(),
        home_page_slug: faker.datatype.uuid(),
        name: faker.lorem.sentence(),
        slug: faker.lorem.word(),
      })),
    });

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
    return wrapper.findComponent<typeof Avatar>('[data-testid="avatar"]');
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
    return wrapper.findComponent<typeof RouterLink>('[data-testid="material"]');
  };

  test('Click on profile toggles menu', async () => {
    await getButtonWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBe(true);

    await getButtonWrapper().trigger('click');
    expect(getMenuWrapper().exists()).toBe(false);
  });

  test.todo('Click outside profile should close menu');

  test('Avatar should have correct props', () => {
    expect(getAvatarWrapper().props().firstName).toBe(user.firstName);
    expect(getAvatarWrapper().props().lastName).toBe(user.lastName);
  });

  test('ProfileMenu displays correct name', () => {
    expect(getNameWrapper().text()).toBe(`${user.firstName} ${user.lastName}`);
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

    expect((getProfileLinkWrapper() as VueWrapper).props().to).toEqual({
      name: 'profile',
    });
  });

  test('Click on logout clears token and redirects to /login', async () => {
    await getButtonWrapper().trigger('click');
    await getLogoutWrapper().trigger('click');

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });

  test('Menu must be closed after click on profile', async () => {
    await getButtonWrapper().trigger('click');

    await (getProfileLinkWrapper() as VueWrapper).trigger('click');

    expect(getMenuWrapper().exists()).toBe(false);
  });

  test('Menu must be closed after click on material', async () => {
    await getButtonWrapper().trigger('click');

    await getMaterialWrapper().trigger('click');

    expect(getMenuWrapper().exists()).toBe(false);
  });

  test('Menu must be closed after click on logout', async () => {
    await getButtonWrapper().trigger('click');

    await getLogoutWrapper().trigger('click');

    expect(getMenuWrapper().exists()).toBe(false);
  });

  test('Has correct number of links to materials', async () => {
    await getButtonWrapper().trigger('click');
    const materials = getMaterialsWrapper();

    expect(materials).toHaveLength(studies.items.length);
  });

  test('Link to material has correct name and route', async () => {
    await getButtonWrapper().trigger('click');
    const material = getMaterialWrapper();

    expect(material.text()).toBe(studies.items[0].name);
    expect(material.props().to).toStrictEqual({
      name: 'materials',
      params: { id: studies.items[0].homePageSlug },
    });
  });
});
