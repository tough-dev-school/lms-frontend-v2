import type { Meta, StoryObj } from '@storybook/vue3';
import VRadioSwitch from './VRadioSwitch.vue';

export default {
  title: 'VRadioSwitch',
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
  args: {},
};
