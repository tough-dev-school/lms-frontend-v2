import { mount, VueWrapper } from '@vue/test-utils';
import VToastFeed from '@/components/VToastFeed/VToastFeed.vue';
import { faker } from '@faker-js/faker';
import useToasts, { VToastMessage } from '@/stores/toasts';
import type VToast from '@/components/VToast/VToast.vue';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import { ref } from 'vue';

const MESSAGES = 10;

vi.mock('@/stores/toasts');

describe('VToastFeed', () => {
  let wrapper: VueWrapper;

  beforeEach(async () => {
    (useToasts as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: ref(
        Array.from({ length: MESSAGES }).map(() => {
          return new VToastMessage(faker.lorem.sentence(), 'success', 10_000);
        }),
      ),
      removeMessage: vi.fn(),
    });

    wrapper = mount(VToastFeed, {
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
    const { messages, removeMessage } = useToasts();

    (getFirstToast() as VueWrapper).vm.$emit('delete', messages.value[0].id);

    expect(removeMessage).toHaveBeenCalledTimes(1);
    expect(removeMessage).toHaveBeenCalledWith(messages.value[0].id);
  });

  test('Feed has correct amount of toasts', async () => {
    expect(getAllToasts()).toHaveLength(MESSAGES);
  });
});
