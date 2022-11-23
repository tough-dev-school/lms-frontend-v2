import type { Meta, Story } from '@storybook/vue3';
import VButton from '@/components/VButton.vue';

export default {
  title: 'Forms/VButton',
  component: VButton,
} as Meta;

const Template: Story = (args) => ({
  components: { VButton },
  setup() {
    return { args };
  },
  template: '<VButton v-bind="args">Press me</VButton>',
});

export const Default = Template.bind({});
Default.args = {
  tag: 'button',
};

export const Link = Template.bind({});
Link.args = {
  tag: 'link',
};
