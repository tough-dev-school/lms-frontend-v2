import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { faker } from '@faker-js/faker';
import VThread from './VThread.vue';
import { provideActiveReply } from './activeReply';
import {
  createAnswerTree,
  createUser,
  useHomeworkAnswersCreate,
} from '@/api/generated';

vi.mock('@formkit/auto-animate/vue', () => ({
  useAutoAnimate: () => [null],
}));
vi.mock('vue-router');
vi.mock('@tanstack/vue-query');
vi.mock('@/api/generated', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/generated')>();
  return {
    ...actual,
    useHomeworkAnswersCreate: vi.fn(),
  };
});

// Explicit slugs because the factory may produce the same one twice
const firstAnswer = createAnswerTree({
  slug: faker.string.uuid(),
  descendants: [],
});
const secondAnswer = createAnswerTree({
  slug: faker.string.uuid(),
  descendants: [],
});
const user = createUser();

describe('VThread', () => {
  let wrapper: VueWrapper;
  let activeReply: Ref<string | null>;

  beforeEach(() => {
    vi.mocked(useRoute).mockReturnValue(
      {} as unknown as ReturnType<typeof useRoute>,
    );
    vi.mocked(useRouter).mockReturnValue({
      push: vi.fn(),
      currentRoute: ref({ hash: '' }),
    } as unknown as ReturnType<typeof useRouter>);
    vi.mocked(useHomeworkAnswersCreate).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: ref(false),
      error: ref(null),
    } as unknown as ReturnType<typeof useHomeworkAnswersCreate>);

    // Two sibling threads under one provider, like on the answer page
    const Host = defineComponent({
      setup() {
        activeReply = provideActiveReply();
        return () => [
          h(VThread, { answer: firstAnswer, user }),
          h(VThread, { answer: secondAnswer, user }),
        ];
      },
    });

    wrapper = mount(Host, {
      attachTo: document.body,
      global: {
        stubs: {
          VAnswerProvider: true,
          VExistingAnswerProvider: true,
          VCreateAnswer: true,
          VThreadProvider: true,
        },
      },
    });
  });

  const getThreads = () => wrapper.findAllComponents(VThread);
  const getReplyToggle = (index: number) =>
    getThreads()[index].find('[data-testid="reply-toggle"]');
  const getReplyForm = (index: number) =>
    getThreads()[index].find('[data-testid="reply-form"]');

  test('reply form is hidden by default', () => {
    expect(getReplyForm(0).isVisible()).toBe(false);
    expect(activeReply.value).toBeNull();
  });

  test('reply button opens the form and marks the thread as active', async () => {
    await getReplyToggle(0).trigger('click');

    expect(getReplyForm(0).isVisible()).toBe(true);
    expect(activeReply.value).toBe(firstAnswer.slug);
  });

  test('cancel closes the form and clears the active reply', async () => {
    await getReplyToggle(0).trigger('click');
    await getReplyToggle(0).trigger('click');

    expect(getReplyForm(0).isVisible()).toBe(false);
    expect(activeReply.value).toBeNull();
  });

  test('opening a reply in another thread closes the previous one', async () => {
    await getReplyToggle(0).trigger('click');
    await getReplyToggle(1).trigger('click');

    expect(getReplyForm(0).isVisible()).toBe(false);
    expect(getReplyForm(1).isVisible()).toBe(true);
    expect(activeReply.value).toBe(secondAnswer.slug);
  });
});
