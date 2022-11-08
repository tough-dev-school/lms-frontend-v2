import type { Meta, Story } from '@storybook/vue3';
import VHeading from '@/components/VHeading.vue';

export default {
  title: 'Forms/VHeading',
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

export const VHeading1 = Template.bind({});
VHeading1.args = {
  level: 1,
};

export const VHeading2 = Template.bind({});
VHeading2.args = {
  level: 2,
};

export const VHeading3 = Template.bind({});
VHeading3.args = {
  level: 3,
};
