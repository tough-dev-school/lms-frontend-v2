import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { ref } from 'vue';
import VSelect from '@/components/VSelect/VSelect.vue';
import { createValidationError } from '@/types/error';

export default {
  title: 'Forms/VSelect',
  component: VSelect,
} as Meta;

const options = [
  { value: 'ru', label: '🇷🇺 Русский' },
  { value: 'en', label: '🇬🇧 English' },
];

const Template: StoryFn = (args) => ({
  components: { VSelect },
  setup() {
    const value = ref(args.options[0]?.value ?? '');
    return { args, value };
  },
  template: '<VSelect v-model="value" v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    name: 'language',
    label: 'Language',
    tip: 'This is a tooltip for select',
    options,
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    name: 'language',
    options,
  },
};

export const LongLabels = {
  render: Template,

  args: {
    name: 'long',
    label: 'Option with a long label',
    options: [
      {
        value: 'long',
        label:
          'A very long option label that does not fit into the select and has to be cut off at the end',
      },
      { value: 'short', label: 'Short' },
    ],
  },
};

export const ManyOptions = {
  render: Template,

  args: {
    name: 'many',
    label: 'Many options',
    options: Array.from({ length: 30 }, (_, index) => ({
      value: String(index + 1),
      label: `Option ${index + 1}`,
    })),
  },
};

export const ErrorWithMessage = {
  render: Template,

  args: {
    name: 'language',
    label: 'Language',
    options,
    error: createValidationError({ language: 'This is error' }),
  },
};

export const ErrorWithoutMessage = {
  render: Template,

  args: {
    name: 'language',
    label: 'Language',
    options,
    error: true,
  },
};
