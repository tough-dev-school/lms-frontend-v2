import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VTag from '@/components/VTag/VTag.vue';

export default {
  title: 'UI/VTag',
  component: VTag,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VTag },
  setup() {
    return { args };
  },
  template: '<div class="flex"><VTag>{{ args.label }}</VTag></div>',
});

export const Default = {
  render: Template,
  args: {
    label: '10 ноября',
  },
};

export const Deadline = {
  render: Template,
  args: {
    label: 'Дедлайн 17 ноября, 23:59',
  },
};
