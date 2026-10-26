import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import VLinksSettings from './VLinksSettings.vue';
import { forms, setPage } from '@/mocks/inertia';
import { NEW_STUDENT, STUDENT } from '@/mocks/users';

const mountWrapper = () => mount(VLinksSettings);

const getInput = (wrapper: ReturnType<typeof mountWrapper>, testId: string) =>
  wrapper.find(`[data-testid="${testId}"] input`);

const getSaveButton = (wrapper: ReturnType<typeof mountWrapper>) =>
  wrapper.find('[data-testid="save"]');

describe('VLinksSettings', () => {
  test('fills the fields from the profile', () => {
    setPage({ props: { user: STUDENT } });

    const wrapper = mountWrapper();

    expect(
      (getInput(wrapper, 'github').element as HTMLInputElement).value,
    ).toBe(STUDENT.github_username);
  });

  test('starts empty for a student without links', () => {
    setPage({ props: { user: NEW_STUDENT } });

    const wrapper = mountWrapper();

    expect(
      (getInput(wrapper, 'telegram').element as HTMLInputElement).value,
    ).toBe(NEW_STUDENT.telegram_username ?? '');
  });

  test('saves the links to the profile', async () => {
    setPage({ props: { user: STUDENT } });
    const wrapper = mountWrapper();

    await getInput(wrapper, 'github').setValue('new-github');
    await getSaveButton(wrapper).trigger('click');

    expect(forms[0].submissions).toEqual([
      {
        method: 'patch',
        url: '/settings/profile',
        data: {
          github_username: 'new-github',
          linkedin_username: STUDENT.linkedin_username,
          telegram_username: STUDENT.telegram_username,
        },
      },
    ]);
  });

  test('shows a backend error next to the field', async () => {
    const wrapper = mountWrapper();

    forms[0].setError('github_username', 'Invalid username');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testid="github"]').text()).toContain(
      'Invalid username',
    );
  });
});
