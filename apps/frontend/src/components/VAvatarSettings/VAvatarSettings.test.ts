import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import VAvatarSettings from './VAvatarSettings.vue';
import { forms, setPage } from '@/mocks/inertia';
import { STUDENT } from '@/mocks/users';

const AVATAR_URL = 'https://example.com/avatar.png';

const mountWrapper = () =>
  mount(VAvatarSettings, {
    global: { stubs: { AvatarCropper: true } },
  });

const getSaveButton = (wrapper: ReturnType<typeof mountWrapper>) =>
  wrapper.find('[data-testid="save"]');

describe('VAvatarSettings', () => {
  test('has nothing to save until the avatar changes', () => {
    setPage({ props: { user: { ...STUDENT, avatar: AVATAR_URL } } });

    const wrapper = mountWrapper();

    expect(getSaveButton(wrapper).attributes('disabled')).toBeDefined();
  });

  test('removes the avatar by sending an empty one', async () => {
    setPage({ props: { user: { ...STUDENT, avatar: AVATAR_URL } } });
    const wrapper = mountWrapper();

    await wrapper.find('[data-testid="delete"]').trigger('click');
    await getSaveButton(wrapper).trigger('click');

    expect(forms[0].submissions).toEqual([
      { method: 'post', url: '/settings/avatar', data: { avatar: '' } },
    ]);
  });

  test('offers no delete button without an avatar', () => {
    setPage({ props: { user: { ...STUDENT, avatar: null } } });

    const wrapper = mountWrapper();

    expect(wrapper.find('[data-testid="delete"]').exists()).toBe(false);
  });
});
