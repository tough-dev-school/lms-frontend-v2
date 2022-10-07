import { describe, expect, test, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ToastFeed from './ToastFeed.vue';
import { faker } from '@faker-js/faker';
import useToasts, { ToastMessage } from '../stores/toasts.ts';
import { createTestingPinia } from '@pinia/testing';
import { vi } from 'vitest';

const MESSAGES = 10;

describe('ToastFeed', () => {
  let wrapper;

  beforeEach(async () => {
    const messages = [...Array(MESSAGES)].map(() => {
      return new ToastMessage(faker.lorem.sentence(), 10000);
    });

    wrapper = shallowMount(ToastFeed, {
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
    return wrapper.findComponent('[data-testid="toast"]');
  };

  test('Click on toast calls delete with correct id', async () => {
    const toasts = useToasts();

    await getFirstToast().vm.$emit('delete', toasts.messages[0].id);

    expect(toasts.removeMessage).toHaveBeenCalledOnce();
    expect(toasts.removeMessage).toHaveBeenCalledWith(toasts.messages[0].id);
  });

  test('Feed has correct ammount of toasts', async () => {
    expect(getAllToasts()).toHaveLength(MESSAGES);
  });
});
