import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VButton from '@/components/VButton/VButton.vue';

export default {
  title: 'Forms/VButton',
  component: VButton,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'link'],
    },
    size: {
      control: 'select',
      options: ['big', 'inline'],
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VButton },
  setup() {
    const { label, ...props } = args;
    return { label, props };
  },
  template: '<VButton v-bind="props">{{ label }}</VButton>',
});

export const Primary = {
  render: Template,
  args: {
    appearance: 'primary',
    size: 'big',
    label: 'Отправить домашку',
  },
};

export const Secondary = {
  render: Template,
  args: {
    appearance: 'secondary',
    size: 'big',
    label: 'Редактировать',
  },
};

export const Link = {
  render: Template,
  args: {
    appearance: 'link',
    size: 'big',
    label: 'Войти по паролю',
  },
};

export const Inline = {
  render: Template,
  args: {
    appearance: 'primary',
    size: 'inline',
    label: 'Ответить',
  },
};

export const Loading = {
  render: Template,
  args: {
    appearance: 'primary',
    size: 'big',
    loading: true,
    label: 'Отправляем…',
  },
};

export const Disabled = {
  render: Template,
  args: {
    appearance: 'primary',
    size: 'big',
    disabled: true,
    label: 'Отправить домашку',
  },
};

export const LongLabel = {
  render: Template,
  args: {
    appearance: 'primary',
    size: 'big',
    label:
      'Отправить домашку на проверку однокурсникам и получить обратную связь от экспертов',
  },
};
