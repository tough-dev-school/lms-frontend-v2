import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VNewAnswer from '@/components/VNewAnswer.vue';
import type VTextEditor from '@/components/VTextEditor.vue';
import type VButton from '@/components/VButton.vue';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import useHomework from '@/stores/homework';

const defaultProps = {
  questionId: faker.datatype.uuid(),
  parentId: faker.datatype.uuid(),
};

const text = faker.lorem.sentence();

describe('VNewAnswer', () => {
  let wrapper: VueWrapper<InstanceType<typeof VNewAnswer>>;

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

    expect(getEditorWrapper().props().modelValue).toBe(text);
  });

  test('emits update on send', async () => {
    await getEditorWrapper().vm.$emit('update:modelValue', text);
    await getButtonWrapper().vm.$emit('click');

    expect(wrapper.emitted().update).toBeDefined();
  });

  test('send button is disable with no text', () => {
    expect(getButtonWrapper().attributes()['disabled']).toBe('true');
  });

  test('disallow sending of empty paragraphs', async () => {
    await getEditorWrapper().vm.$emit(
      'update:modelValue',
      `<p></p>`.repeat(faker.datatype.number({ min: 1, max: 100 })),
    );

    expect(getButtonWrapper().attributes()['disabled']).toBe('true');
  });
});
