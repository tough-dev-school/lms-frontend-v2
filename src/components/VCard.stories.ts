import type { Meta, Story } from '@storybook/vue3';
import VCard from '@/components/VCard.vue';

export default {
  title: 'UI/VCard',
  component: VCard,
} as Meta;

const Template: Story = (args) => ({
  components: { VCard },
  setup() {
    return { args };
  },
  template: '<VCard v-bind="args">This is card</VCard>',
});

export const Default = Template.bind({});
Default.args = {};
