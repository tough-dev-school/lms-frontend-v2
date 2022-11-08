import type { Meta, Story } from '@storybook/vue3';
import Preloader from '@/components/VPreloader.vue';

export default {
  title: 'UI/Preloader',
  component: Preloader,
} as Meta;

const Template: Story = (args) => ({
  components: { Preloader },
  setup() {
    return { args };
  },
  template: '<Preloader v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = { message: 'This is a toast!' };
