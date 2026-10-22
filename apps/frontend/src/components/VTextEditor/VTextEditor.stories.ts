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

// Old answers are edited from their HTML until the first save
export const LegacyText = {
  render: Template,

  args: {
    modelValue: {},
    legacyText: LEGACY_ANSWER.legacy_text,
  },
};
