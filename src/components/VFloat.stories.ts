import type { Meta, Story } from '@storybook/vue3';
import VFloat from '@/components/VFloat.vue';

export default {
  title: 'UI/VFloat',
  component: VFloat,
} as Meta;

const Template: Story = (args) => ({
  components: { VFloat },
  setup() {
    return { args };
  },
  template: '<VFloat v-bind="args">Floating tip!</VFloat>',
});

export const Default = Template.bind({});
Default.args = {};
