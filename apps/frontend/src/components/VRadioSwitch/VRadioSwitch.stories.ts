import type { Meta, StoryFn } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { IconDevices, IconMoonFilled, IconSunFilled } from '@tabler/icons-vue';
import VRadioSwitch from './VRadioSwitch.vue';

export default {
  title: 'UI/VRadioSwitch',
  component: VRadioSwitch,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VRadioSwitch },
  setup() {
    const value = ref(args.modelValue);
    return { args, value };
  },
  template: '<VRadioSwitch v-bind="args" v-model="value" />',
});

export const Default = {
  render: Template,
  args: {
    options: [
      { value: 'auto', label: 'Как в системе', icon: IconDevices },
      { value: 'light', label: 'Светлая', icon: IconSunFilled },
      { value: 'dark', label: 'Тёмная', icon: IconMoonFilled },
    ],
    modelValue: 'auto',
  },
};
