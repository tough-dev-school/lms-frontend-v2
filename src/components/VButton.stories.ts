import type { Meta, Story } from '@storybook/vue3';
import Button from '@/components/VButton.vue';

export default {
  title: 'Forms/Button',
  component: Button,
} as Meta;

const Template: Story = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">Press me</Button>',
});

export const Default = Template.bind({});
Default.args = {
  type: 'button',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
};
