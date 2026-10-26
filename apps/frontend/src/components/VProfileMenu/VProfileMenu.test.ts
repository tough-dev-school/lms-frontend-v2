import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
import type VAvatar from '@/components/VAvatar/VAvatar.vue';
import { router, setPage } from '@/mocks/inertia';
import { STUDENT, NEW_STUDENT } from '@/mocks/users';

describe('VProfileMenu', () => {
  let wrapper: VueWrapper<InstanceType<typeof VProfileMenu>>;

  beforeEach(() => {
    vi.spyOn(router, 'visit');
    vi.spyOn(router, 'post');
    wrapper = mount(VProfileMenu, { shallow: true });
  });

  const getButton = () => wrapper.find('[data-testid="button"]');
  const getMenu = () => wrapper.find('[data-testid="menu"]');
  const getAvatar = () =>
    wrapper.findComponent<typeof VAvatar>('[data-testid="avatar"]');
  const getName = () => wrapper.find('[data-testid="name"]');
  const getUsername = () => wrapper.find('[data-testid="username"]');
  const getItem = (id: string) => wrapper.find(`[data-testid="${id}"]`);

  const openMenu = () => getButton().trigger('click');

  test('Menu is closed by default', () => {
    expect(getMenu().exists()).toBe(false);
  });

  test('Menu opens on button click', async () => {
    await openMenu();

    expect(getMenu().exists()).toBe(true);
  });

  test('Menu closes on button click', async () => {
    await openMenu();
    await openMenu();

    expect(getMenu().exists()).toBe(false);
  });

  test('Avatar shows the signed-in user', () => {
    expect(getAvatar().props('userId')).toBe(STUDENT.uuid);
    expect(getAvatar().props('image')).toBeFalsy();
  });

  test('Name is displayed correctly', () => {
    expect(getName().text()).toBe(`${STUDENT.first_name} ${STUDENT.last_name}`);
  });

  test('Username is displayed correctly', () => {
    expect(getUsername().text()).toBe(STUDENT.username);
  });

  test.each([
    ['home', '/courses'],
    ['certificates', '/certificates'],
    ['settings', '/settings'],
  ])('%s item visits %s', async (id, url) => {
    await openMenu();
    await getItem(id).trigger('click');

    expect(router.visit).toHaveBeenCalledWith(url);
  });

  test('Logout posts to logout', async () => {
    await openMenu();
    await getItem('logout').trigger('click');

    expect(router.post).toHaveBeenCalledWith('/logout');
  });

  test('Certificate data item is hidden when names are filled', async () => {
    await openMenu();

    expect(getItem('certificate').exists()).toBe(false);
  });

  test('Certificate data item leads to the certificate settings', async () => {
    setPage({ props: { user: NEW_STUDENT } });
    await openMenu();
    await getItem('certificate').trigger('click');

    expect(router.visit).toHaveBeenCalledWith('/settings#certificate');
  });
});
