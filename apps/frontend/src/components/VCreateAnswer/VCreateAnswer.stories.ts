import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { ref } from 'vue';
import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
import { getEmptyContent } from '@/utils/tiptap';
import { createValidationError } from '@/types/error';
import { htmlToContent } from '@/mocks/homework';

export default {
  title: 'Answer/VCreateAnswer',
  component: VCreateAnswer,
  args: {
    isPending: false,
    error: null,
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCreateAnswer },
  setup() {
    const content = ref(args.modelValue ?? getEmptyContent());
    return { args, content };
  },
  template: '<VCreateAnswer v-bind="args" v-model="content" />',
});

const DRAFT = htmlToContent(
  '<p>Мне нравится, что вы разделили таск-трекер и авторизацию по данным. Вопрос: кто публикует <code>TaskAssigned</code>?</p>',
);

export const Empty = {
  render: Template,
};

export const WithDraft = {
  render: Template,
  args: {
    modelValue: DRAFT,
  },
};

export const Pending = {
  render: Template,
  args: {
    modelValue: DRAFT,
    isPending: true,
  },
};

export const WithError = {
  render: Template,
  args: {
    modelValue: DRAFT,
    error: createValidationError({
      content: 'Дедлайн по этой домашке прошёл, ответ отправить нельзя.',
    }),
  },
};
