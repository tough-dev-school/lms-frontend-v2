import type { VToast } from '@/components/VToast';

import { VToastFeed } from '@/components/VToastFeed';
import useToasts, { VToastMessage } from '@/stores/toasts';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { VueWrapper, mount } from '@vue/test-utils';

const MESSAGES = 10;

describe('VToastFeed', () => {
  let wrapper: VueWrapper;

  beforeEach(async () => {
    const messages = [...Array(MESSAGES)].map(() => {
      return new VToastMessage(faker.lorem.sentence(), 'success', 10000);
    });

    wrapper = mount(VToastFeed, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              toasts: {
                messages,
              },
            },
          }),
        ],
      },
      shallow: true,
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

    (getFirstToast() as VueWrapper).vm.$emit('delete', toasts.messages[0].id);

    expect(toasts.removeMessage).toHaveBeenCalledTimes(1);
    expect(toasts.removeMessage).toHaveBeenCalledWith(toasts.messages[0].id);
  });

  test('Feed has correct ammount of toasts', async () => {
    expect(getAllToasts()).toHaveLength(MESSAGES);
  });
});
