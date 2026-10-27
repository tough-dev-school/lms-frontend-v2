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
    label: 'Язык интерфейса',
    tip: 'Язык писем и сертификатов не изменится',
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
    name: 'course',
    label: 'Курс',
    options: [
      {
        value: 'web-services-1',
        label:
          'Разработка веб-сервисов: от первого эндпоинта до стабильной работы под нагрузкой',
      },
      { value: 'rest-api-3', label: 'Проектирование REST API' },
    ],
  },
};

export const ManyOptions = {
  render: Template,

  args: {
    name: 'stream',
    label: 'Поток',
    options: Array.from({ length: 30 }, (_, index) => ({
      value: String(index + 1),
      label: `Поток ${index + 1}`,
    })),
  },
};

export const ErrorWithMessage = {
  render: Template,

  args: {
    name: 'language',
    label: 'Язык интерфейса',
    options,
    error: createValidationError({
      language: 'Выберите язык из списка',
    }),
  },
};

export const ErrorWithoutMessage = {
  render: Template,

  args: {
    name: 'language',
    label: 'Язык интерфейса',
    options,
    error: true,
  },
};
