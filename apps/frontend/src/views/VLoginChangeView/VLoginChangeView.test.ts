import { describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLoginChangeView from './VLoginChangeView.vue';
import VPasswordResetForm from '@/components/VPasswordResetForm/VPasswordResetForm.vue';
import { faker } from '@faker-js/faker';
import { forms } from '@/mocks/inertia';

const uid = faker.string.uuid();
const token = faker.string.uuid();

describe('VLoginChangeView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginChangeView>>;

  beforeEach(() => {
    wrapper = mount(VLoginChangeView, {
      shallow: true,
      props: { uid, token },
      global: {
        renderStubDefaultSlot: true,
      },
    });
  });

  const getPasswordResetFormWrapper = () =>
    wrapper.findComponent(VPasswordResetForm);

  test('posts the new password to the link from the email', () => {
    const password = faker.internet.password();

    getPasswordResetFormWrapper().vm.$emit('save', password);

    expect(forms[0].submissions).toEqual([
      {
        method: 'post',
        url: `/auth/password/reset/${uid}/${token}/`,
        data: { new_password1: password, new_password2: password },
      },
    ]);
  });

  test('passes server errors to the form', async () => {
    forms[0].setError('new_password1', 'Too short');
    await wrapper.vm.$nextTick();

    expect(getPasswordResetFormWrapper().props('error')).toEqual({
      new_password1: 'Too short',
    });
  });
});
