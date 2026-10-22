import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VError from '@/components/VError/VError.vue';
import { createValidationError } from '@/types/error';

export default {
  title: 'Forms/VError',
  component: VError,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VError },
  setup() {
    return { args };
  },
  template: '<VError v-bind="args" />',
});

const LOGIN_ERROR = createValidationError({
  non_field_errors: 'Невозможно войти с предоставленными учётными данными.',
  username: 'Обязательное поле.',
});

// Without a whitelist every field is shown with its name
export const AllFields = {
  render: Template,
  args: {
    error: LOGIN_ERROR,
  },
};

// Forms show field errors next to inputs and only the general error here
export const Whitelisted = {
  render: Template,
  args: {
    error: LOGIN_ERROR,
    whitelist: ['non_field_errors'],
  },
};

export const SeveralMessages = {
  render: Template,
  args: {
    error: createValidationError({
      new_password2: [
        'Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.',
        'Введённый пароль слишком широко распространён.',
      ],
    }),
  },
};
