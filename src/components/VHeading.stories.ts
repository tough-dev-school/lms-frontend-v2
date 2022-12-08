import type { Meta, Story } from '@storybook/vue3';
import VHeading from '@/components/VHeading.vue';

export default {
  title: 'UI/VHeading',
  component: VHeading,
} as Meta;

const Template: Story = (args) => ({
  components: { VHeading },
  setup() {
    return { args };
  },
  template: '<VHeading v-bind="args">VHeading</VHeading>',
});

export const Default = Template.bind({});
Default.args = {};

export const H1 = Template.bind({});
H1.args = {
  tag: 'h1',
};

export const H2 = Template.bind({});
H2.args = {
  tag: 'h2',
};

export const H3 = Template.bind({});
H3.args = {
  tag: 'h3',
};
