import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import VCertificateSettings from './VCertificateSettings.vue';
import { GenderEnum } from '@/api/generated';
import { forms, setPage } from '@/mocks/inertia';
import { STUDENT } from '@/mocks/users';

const mountWrapper = () => mount(VCertificateSettings);

const getSaveButton = (wrapper: ReturnType<typeof mountWrapper>) =>
  wrapper.find('[data-testid="save"]');

describe('VCertificateSettings', () => {
  test('saves the names and gender for the certificate', async () => {
    setPage({ props: { user: STUDENT } });
    const wrapper = mountWrapper();

    await wrapper.find('[data-testid="lastNameEn"] input').setValue('Smith');
    await wrapper.find('[data-testid="gender-male"]').trigger('click');
    await getSaveButton(wrapper).trigger('click');

    expect(forms[0].submissions).toEqual([
      {
        method: 'patch',
        url: '/settings/profile',
        data: {
          first_name: STUDENT.first_name,
          last_name: STUDENT.last_name,
          first_name_en: STUDENT.first_name_en,
          last_name_en: 'Smith',
          gender: GenderEnum.male,
        },
      },
    ]);
  });

  test('picks male when the profile has no gender, the certificate needs one', () => {
    setPage({ props: { user: { ...STUDENT, gender: undefined } } });

    mountWrapper();

    expect(forms[0].data().gender).toBe(GenderEnum.male);
  });

  test('shows a gender error from the backend', async () => {
    const wrapper = mountWrapper();

    forms[0].setError('gender', 'Pick one');
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Pick one');
  });
});
