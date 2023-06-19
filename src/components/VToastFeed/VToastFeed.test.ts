import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { VToastFeed } from '@/components/VToastFeed';
import { faker } from '@faker-js/faker';
import useToasts, { VToastMessage } from '@/stores/toasts';
import type { VToast } from '@/components/VToast';
import { createTestingPinia } from '@pinia/testing';

const MESSAGES = 10;

describe('VToastFeed', () => {
  let wrapper: VueWrapper;

  beforeEach(async () => {
    const messages = [...Array(MESSAGES)].map(() => {
      return new VToastMessage(faker.lorem.sentence(), 'success', 10000);
    });

    wrapper = mount(VToastFeed, {
      shallow: true,
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              toasts: {
                messages,
              },
            },
            createSpy: vi.fn,
          }),
        ],
      },
    });
  });

  const getAllToasts = () => {
    return wrapper.findAll('[data-testid="toast"]');
  };

  const getFirstToast = () => {
    return wrapper.findComponent<typeof VToast>('[data-testid="toast"]');
  };

  test('VToast delete event calls removeMessage with correct id', async () => {
    const toasts = useToasts();

    ((await getFirstToast()) as VueWrapper).vm.$emit(
      'delete',
      toasts.messages[0].id,
    );

    expect(toasts.removeMessage).toHaveBeenCalledOnce();
    expect(toasts.removeMessage).toHaveBeenCalledWith(toasts.messages[0].id);
  });

  test('Feed has correct ammount of toasts', async () => {
    expect(getAllToasts()).toHaveLength(MESSAGES);
  });
});
