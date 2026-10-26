import { describe, expect, test, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import VThread from '@/components/VThread/VThread.vue';
import type VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
import { forms } from '@/mocks/inertia';
import { CLASSMATE_ANSWER, STUDENT_ANSWER } from '@/mocks/homework';
import { getEmptyContent } from '@/utils/tiptap';

vi.mock('@formkit/auto-animate/vue', () => ({
  useAutoAnimate: () => [null],
}));

const mountThread = (answer = CLASSMATE_ANSWER) =>
  mount(VThread, { props: { answer }, shallow: true });

describe('VThread', () => {
  test('anchors the answer by its slug, so links to a comment scroll to it', () => {
    const wrapper = mountThread();

    expect(wrapper.find(`[id="${CLASSMATE_ANSWER.slug}"]`).exists()).toBe(true);
  });

  test('shows a classmate answer read-only', () => {
    const wrapper = mountThread();

    expect(wrapper.findComponent({ name: 'VAnswer' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'VExistingAnswer' }).exists()).toBe(
      false,
    );
  });

  test('lets the student edit their own answer', () => {
    const wrapper = mountThread(STUDENT_ANSWER);

    expect(wrapper.findComponent({ name: 'VExistingAnswer' }).exists()).toBe(
      true,
    );
  });

  test('posts a reply with the answer as parent', async () => {
    const wrapper = mountThread();
    await flushPromises();

    wrapper
      .findComponent<typeof VCreateAnswer>({ name: 'VCreateAnswer' })
      .vm.$emit('send');

    expect(forms.at(-1)?.submissions).toEqual([
      {
        method: 'post',
        url: `/homework/${CLASSMATE_ANSWER.question}/answers`,
        data: { content: getEmptyContent(), parent: CLASSMATE_ANSWER.slug },
      },
    ]);
  });
});
