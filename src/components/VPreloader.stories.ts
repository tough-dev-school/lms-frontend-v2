import type { Meta, Story } from '@storybook/vue3';
import VPreloader from '@/components/VPreloader.vue';

export default {
  title: 'UI/VPreloader',
  component: VPreloader,
} as Meta;

const Template: Story = (args) => ({
  components: { VPreloader },
  setup() {
    return { args };
  },
  template: '<VPreloader v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = { message: 'This is a toast!' };
