import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { ref } from 'vue';
import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
import { getEmptyContent } from '@/utils/tiptap';
import { createValidationError } from '@/types/error';
import { ATTACHMENTS, htmlToContent } from '@/mocks/homework';

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
    const files = ref<File[]>(args.files ?? []);
    return { args, content, files };
  },
  template:
    '<VCreateAnswer v-bind="args" v-model="content" v-model:files="files" />',
});

const DRAFT = htmlToContent(
  '<p>Мне нравится, что бронь и выдача у тебя разные ресурсы. Вопрос: что вернёт <code>POST /reservations</code>, если книгу уже забронировали?</p>',
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

const pdf = (name: string) =>
  new File(['%PDF-1.4'], name, { type: 'application/pdf' });

export const WithAttachments = {
  render: Template,
  args: {
    modelValue: DRAFT,
    allowAttachments: true,
  },
};

export const WithPickedFiles = {
  render: Template,
  args: {
    modelValue: DRAFT,
    allowAttachments: true,
    files: [pdf('library-api.pdf'), pdf('er-diagram.pdf')],
  },
};

export const WithExistingAndPickedFiles = {
  render: Template,
  args: {
    modelValue: DRAFT,
    allowAttachments: true,
    existingAttachments: ATTACHMENTS,
    files: [pdf('library-api-v2.pdf')],
  },
};

export const LongFileName = {
  render: Template,
  args: {
    modelValue: DRAFT,
    allowAttachments: true,
    files: [
      pdf(
        'library-api-final-version-really-final-v3-do-not-edit-reservations-and-returns.pdf',
      ),
    ],
  },
};
