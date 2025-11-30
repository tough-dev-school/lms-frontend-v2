import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLoginResetView from './VLoginResetView.vue';
import type VButton from '@/components/VButton/VButton.vue';
import type VTextInput from '@/components/VTextInput/VTextInput.vue';
import { faker } from '@faker-js/faker';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthPasswordResetCreate } from '@/api/generated/hooks';

const defaultProps = {};

const routerPushMock = vi.fn();

vi.mock('vue-router');
vi.mock('@/composables/useAuth');
vi.mock('@/api/generated/hooks');
vi.mock('@tanstack/vue-query');

const email = faker.internet.email();

describe('VLoginResetView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginResetView>>;
  const requestResetMock = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      requestReset: requestResetMock,
    } as any);
    vi.mocked(useRouter).mockReturnValue({
      push: routerPushMock,
    } as any);

    vi.mocked(useAuthPasswordResetCreate).mockReturnValue({
      mutateAsync: requestResetMock,
      isPending: ref(false),
    } as any);

    wrapper = mount(VLoginResetView, {
      shallow: true,
      props: defaultProps,
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

  test('click on send calls requestReset', async () => {
    await typeInEmail();

    await getSendWrapper().trigger('submit');

    expect(requestResetMock).toHaveBeenCalledTimes(1);
    expect(requestResetMock).toHaveBeenCalledWith({ email });
  });

  test('click on send redirects to mail-sent', async () => {
    await typeInEmail();

    await getSendWrapper().trigger('submit');

    expect(requestResetMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({
      name: 'mail-sent',
      query: { email },
    });
  });

  test('button is enabled if email is not empty', async () => {
    await typeInEmail();

    expect(getSendWrapper().attributes('disabled')).toBe('false');
  });

  test('click on password button returns to login', async () => {
    await getPasswordWrapper().vm.$emit('click');

    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });
});
