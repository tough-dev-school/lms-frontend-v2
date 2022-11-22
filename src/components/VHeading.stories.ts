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

export const Level1 = Template.bind({});
Level1.args = {
  level: 1,
};

export const Level2 = Template.bind({});
Level2.args = {
  level: 2,
};

export const Level3 = Template.bind({});
Level3.args = {
  level: 3,
};
