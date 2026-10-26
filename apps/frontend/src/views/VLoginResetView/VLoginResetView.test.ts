import { describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLoginResetView from './VLoginResetView.vue';
import type VButton from '@/components/VButton/VButton.vue';
import type VTextInput from '@/components/VTextInput/VTextInput.vue';
import { faker } from '@faker-js/faker';
import { forms } from '@/mocks/inertia';

const email = faker.internet.email();

describe('VLoginResetView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginResetView>>;

  beforeEach(() => {
    wrapper = mount(VLoginResetView, {
      shallow: true,
      global: {
        renderStubDefaultSlot: true,
        stubs: {
          VCard: false,
        },
      },
    });
  });

  const getEmailWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="email"]');
  const getSendWrapper = () =>
    wrapper.findComponent<typeof VButton>('[data-testid="send"]');
  const getPasswordWrapper = () =>
    wrapper.findComponent<typeof VButton>('[data-testid="password"]');

  const typeInEmail = async () => {
    await getEmailWrapper().vm.$emit('update:modelValue', email);
  };

  test('submit posts the email to the reset endpoint', async () => {
    await typeInEmail();

    await getSendWrapper().trigger('submit');

    expect(forms[0].submissions).toEqual([
      { method: 'post', url: '/login/reset', data: { email } },
    ]);
  });

  test('shows the server error under the email field', async () => {
    forms[0].setError('email', 'Enter a valid email');
    await wrapper.vm.$nextTick();

    expect(getEmailWrapper().props('error')).toEqual({
      email: 'Enter a valid email',
    });
  });

  test('password button links back to login', () => {
    expect(getPasswordWrapper().attributes('href')).toBe('/login');
  });
});
