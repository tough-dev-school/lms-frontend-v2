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
    type: {
      control: 'select',
      options: ['big', 'inline'],
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VButton },
  setup() {
    return { args };
  },
  template: '<VButton v-bind="args">Press me</VButton>',
});

export const Primary = {
  render: Template,
  args: {
    appearance: 'primary',
    type: 'big',
  },
};

export const Secondary = {
  render: Template,
  args: {
    appearance: 'secondary',
    type: 'big',
  },
};

export const Link = {
  render: Template,
  args: {
    appearance: 'link',
    type: 'big',
  },
};

export const Inline = {
  render: Template,
  args: {
    appearance: 'primary',
    type: 'inline',
  },
};
