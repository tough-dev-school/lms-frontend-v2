import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { ref } from 'vue';
import VTextInput from '@/components/VTextInput/VTextInput.vue';
import { createValidationError } from '@/types/error';

export default {
  title: 'Forms/VTextInput',
  component: VTextInput,
  args: {
    name: 'email',
    type: 'email',
    label: 'Почта, на которую купили курс',
    placeholder: 'name@example.com',
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VTextInput },
  setup() {
    const value = ref(args.modelValue ?? '');
    return { args, value };
  },
  template: '<VTextInput v-bind="args" v-model="value" />',
});

export const Default = {
  render: Template,

  args: {
    tip: 'Мы отправим ссылку для входа по этому адресу',
  },
};

export const Filled = {
  render: Template,

  args: {
    modelValue: 'anna.kovaleva@gmail.com',
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    label: undefined,
  },
};

export const ErrorWithMessage = {
  render: Template,

  args: {
    modelValue: 'anna.kovaleva@gmail',
    error: createValidationError({
      email: 'Введите правильный адрес электронной почты.',
    }),
  },
};

export const ErrorWithSeveralMessages = {
  render: Template,

  args: {
    name: 'password',
    type: 'password',
    label: 'Новый пароль',
    placeholder: undefined,
    modelValue: '12345',
    error: createValidationError({
      password: [
        'Пароль слишком короткий. Он должен содержать как минимум 8 символов.',
        'Пароль состоит только из цифр.',
      ],
    }),
  },
};

export const ErrorWithoutMessage = {
  render: Template,

  args: {
    modelValue: 'anna.kovaleva@gmail',
    error: true,
  },
};
