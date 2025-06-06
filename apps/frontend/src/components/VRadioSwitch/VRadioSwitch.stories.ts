import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VRadioSwitch from './VRadioSwitch.vue';

export default {
  title: 'UI/VRadioSwitch',
  component: VRadioSwitch,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VRadioSwitch },
  setup() {
    return { args };
  },
  template: '<VRadioSwitch v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    options: [
      { value: 'option1', label: 'Option 1', icon: 'IconComponent1' },
      { value: 'option2', label: 'Option 2', icon: 'IconComponent2' },
    ],
    modelValue: 'option1',
  },
};
