import type { Meta, Story } from '@storybook/vue3';
import VReplyToggle from '@/components/VReplyToggle.vue';

export default {
  title: 'Answer/VReplyToggle',
  component: VReplyToggle,
} as Meta;

const Template: Story = (args) => ({
  components: { VReplyToggle },
  setup() {
    return { args };
  },
  template: '<VReplyToggle v-bind="args" />',
});

export const Show = Template.bind({});
Show.args = {
  modelValue: false,
};

export const Hide = Template.bind({});
Hide.args = {
  modelValue: true,
};
