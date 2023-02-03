import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VNewAnswer from '@/components/VNewAnswer.vue';
import type VTextEditor from '@/components/VTextEditor.vue';
import type VButton from '@/components/VButton.vue';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import useHomework from '@/stores/homework';
import { getAnswerData } from '@/mocks/homework';
import { nextTick } from 'vue';
import { flushPromises } from '@vue/test-utils';

const defaultProps = {
  questionId: faker.datatype.uuid(),
  parentId: faker.datatype.uuid(),
};

const answer = getAnswerData();
const text = faker.lorem.sentence();

describe('VNewAnswer', () => {
  let wrapper: VueWrapper<InstanceType<typeof VNewAnswer>>;
  let homework: ReturnType<typeof useHomework>;

  beforeEach(() => {
    wrapper = mount(VNewAnswer, {
      shallow: true,
      global: {
        stubs: { VCard: false },
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      props: defaultProps,
    });

    homework = useHomework();

    (homework.postAnswer as ReturnType<typeof vi.fn>).mockResolvedValue(answer);
  });

  const getEditorWrapper = () => {
    return wrapper.findComponent<typeof VTextEditor>('[data-testid="editor"]');
  };

  const getButtonWrapper = () => {
    return wrapper.findComponent<typeof VButton>('[data-testid="button"]');
  };

  test('initially empty', () => {
    expect(getEditorWrapper().props().modelValue).toBe('');
  });

  test('sends data on send', async () => {
    const { parentId, questionId } = defaultProps;
    const homework = useHomework();

    await getEditorWrapper().vm.$emit('update:modelValue', text);
    await getButtonWrapper().vm.$emit('click');

    expect(homework.postAnswer).toHaveBeenCalledOnce();
    expect(homework.postAnswer).toHaveBeenCalledWith({
      parentId,
      questionId,
      text,
    });
  });

  test('clears value on send', async () => {
    await getEditorWrapper().vm.$emit('update:modelValue', text);
    await getButtonWrapper().vm.$emit('click');

    await flushPromises();
    await nextTick();

    expect(getEditorWrapper().props().modelValue).toBe('');
  });

  test('emits update on send', async () => {
    await getEditorWrapper().vm.$emit('update:modelValue', text);
    await getButtonWrapper().vm.$emit('click');

    await flushPromises();

    expect(wrapper.emitted('update')).toStrictEqual([[answer.slug]]);
  });

  test('send button is disable with no text', () => {
    expect(getButtonWrapper().attributes()['disabled']).toBe('true');
  });

  test('disallow sending of empty paragraphs', async () => {
    const tagName = faker.random.word();

    await getEditorWrapper().vm.$emit(
      'update:modelValue',
      `<${tagName}></${tagName}>`.repeat(
        faker.datatype.number({ min: 1, max: 100 }),
      ),
    );

    expect(getButtonWrapper().attributes()['disabled']).toBe('true');
  });
});
