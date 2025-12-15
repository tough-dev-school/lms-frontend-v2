import { vi, describe, beforeEach, expect, test } from 'vitest';
import { RouterLinkStub, mount, VueWrapper } from '@vue/test-utils';
import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
import type VAvatar from '@/components/VAvatar/VAvatar.vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useUsersMeRetrieve } from '@/api/generated/hooks';
import { useRouter } from 'vue-router';
import { createUsersMeRetrieveQueryResponse } from '@/api/generated';

const routerPushMock = vi.fn();

vi.mock('vue-router');

vi.mock('@/api');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  queryClient.setQueryData(
    ['base', 'user', 'me'],
    createUsersMeRetrieveQueryResponse(),
  );

  vi.mocked(useUsersMeRetrieve).mockReturnValue({
    data: ref(createUsersMeRetrieveQueryResponse()),
    isLoading: ref(false),
  } as any);

  const options: VueQueryPluginOptions = {
    queryClient,
  };

  return mount(VProfileMenu, {
    shallow: true,
    global: {
      plugins: [[VueQueryPlugin, options]],
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });
};

describe('VProfileMenu', () => {
  let wrapper: VueWrapper<InstanceType<typeof VProfileMenu>>;

  beforeEach(() => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push: routerPushMock,
    });
    vi.mocked(useUsersMeRetrieve);

    wrapper = createWrapper();
  });

  const getButton = () => wrapper.find('[data-testid="button"]');
  const getMenu = () => wrapper.find('[data-testid="menu"]');
  const getAvatar = () =>
    wrapper.findComponent<typeof VAvatar>('[data-testid="avatar"]');
  const getName = () => wrapper.find('[data-testid="name"]');
  const getUsername = () => wrapper.find('[data-testid="username"]');
  const getHomeButton = () => wrapper.find('[data-testid="home"]');
  const getCertificatesButton = () =>
    wrapper.find('[data-testid="certificates"]');
  const getSettingsButton = () => wrapper.find('[data-testid="settings"]');
  const getLogoutButton = () => wrapper.find('[data-testid="logout"]');

  test('Menu is closed by default', () => {
    expect(getMenu().exists()).toBe(false);
  });

  test('Menu opens on button click', async () => {
    await getButton().trigger('click');

    expect(getMenu().exists()).toBe(true);
  });

  test('Menu closes on button click', async () => {
    await getButton().trigger('click');
    await getButton().trigger('click');

    expect(getMenu().exists()).toBe(false);
  });

  test('Avatar has correct props', () => {
    const avatar = getAvatar();

    expect(avatar.props('userId')).toBe(
      createUsersMeRetrieveQueryResponse().uuid,
    );
    expect(avatar.props('image')).toBe(
      createUsersMeRetrieveQueryResponse().avatar,
    );
  });

  test('Name is displayed correctly', () => {
    expect(getName().text()).toBe(
      `${createUsersMeRetrieveQueryResponse().first_name} ${createUsersMeRetrieveQueryResponse().last_name}`,
    );
  });

  test('Username is displayed correctly', () => {
    expect(getUsername().text()).toBe(
      createUsersMeRetrieveQueryResponse().username,
    );
  });

  test('Home button redirects to home page', async () => {
    await getButton().trigger('click');
    await getHomeButton().trigger('click');

    expect(routerPushMock).toHaveBeenCalledWith({ name: 'courses' });
  });

  test('Certificates button redirects to certificates page', async () => {
    await getButton().trigger('click');
    await getCertificatesButton().trigger('click');

    expect(routerPushMock).toHaveBeenCalledWith({ name: 'certificates' });
  });

  test('Settings button redirects to settings page', async () => {
    await getButton().trigger('click');
    await getSettingsButton().trigger('click');

    expect(routerPushMock).toHaveBeenCalledWith({ name: 'settings' });
  });

  test('Logout button redirects to logout page', async () => {
    await getButton().trigger('click');
    await getLogoutButton().trigger('click');

    expect(routerPushMock).toHaveBeenCalledWith({ name: 'logout' });
  });
});
