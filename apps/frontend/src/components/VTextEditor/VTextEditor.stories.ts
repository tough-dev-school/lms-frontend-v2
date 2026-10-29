import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { ref } from 'vue';
import VTextEditor from '@/components/VTextEditor/VTextEditor.vue';
import { getEmptyContent } from '@/utils/tiptap';
import { LEGACY_ANSWER, SOLUTION_HTML, htmlToContent } from '@/mocks/homework';

export default {
  title: 'Forms/VTextEditor',
  component: VTextEditor,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VTextEditor },
  setup() {
    const content = ref(args.modelValue ?? getEmptyContent());
    return { args, content };
  },
  template: '<VTextEditor v-bind="args" v-model="content" />',
});

export const Default = {
  render: Template,
  args: {},
};

export const Placeholder = {
  render: Template,

  args: {
    placeholder: 'Напишите, что получилось хорошо, и задайте вопросы автору',
  },
};

export const WithContent = {
  render: Template,

  args: {
    modelValue: htmlToContent(SOLUTION_HTML),
  },
};

const IMAGE_SRC =
  'https://cdn.tough-dev.school/assets/2a4930fa-0f57-4732-8629-ea4ad496f1b8.jpg';

export const WithImages = {
  render: Template,

  args: {
    modelValue: htmlToContent(`
      <h2>Event storming</h2>
      <p>Общая специфика расположения стикеров</p>
      <img src="${IMAGE_SRC}">
      <h3>Policy</h3>
      <p>Тут тоже все супер, политики вынесены отдельно от команд</p>
      <h3>Нотификации</h3>
      <p>Нотификация это просто доставка информации о том, что что-то произошло с системой</p>
    `),
  },
};

// Answers saved while images were inline keep them inside paragraphs
export const WithLegacyInlineImage = {
  render: Template,

  args: {
    modelValue: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Текст до картинки ' },
            { type: 'image', attrs: { src: IMAGE_SRC } },
            { type: 'text', text: ' и текст после' },
          ],
        },
      ],
    },
  },
};

// Old answers are edited from their HTML until the first save
export const LegacyText = {
  render: Template,

  args: {
    modelValue: {},
    legacyText: LEGACY_ANSWER.legacy_text,
  },
};
