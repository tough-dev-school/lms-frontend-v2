import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import VSettingsView from './VSettingsView.vue';
import VPasswordResetForm from '@/components/VPasswordResetForm/VPasswordResetForm.vue';
import { forms } from '@/mocks/inertia';

const mountWrapper = () =>
  mount(VSettingsView, {
    shallow: true,
    global: {
      renderStubDefaultSlot: true,
      stubs: { VCard: false },
    },
  });

describe('VSettingsView', () => {
  test.each(['links', 'password', 'certificate', 'avatar', 'preferences'])(
    'table of contents points to the %s section',
    (section) => {
      const wrapper = mountWrapper();

      const link = wrapper.find(`[data-testid="${section}-link"]`);
      const target = wrapper.find(`[data-testid="${section}-settings"]`);

      expect(link.attributes('href')).toBe(
        `/settings#${target.attributes('id')}`,
      );
    },
  );

  test('sends the new password twice, the backend checks they match', () => {
    const wrapper = mountWrapper();

    wrapper.findComponent(VPasswordResetForm).vm.$emit('save', 'correct-horse');

    expect(forms[0].submissions).toEqual([
      {
        method: 'post',
        url: '/settings/password',
        data: {
          new_password1: 'correct-horse',
          new_password2: 'correct-horse',
        },
      },
    ]);
  });

  test('clears the password fields after saving', () => {
    const wrapper = mountWrapper();

    wrapper.findComponent(VPasswordResetForm).vm.$emit('save', 'correct-horse');

    expect(forms[0].data()).toEqual({ new_password1: '', new_password2: '' });
  });
});
