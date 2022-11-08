import type { Meta, Story } from '@storybook/vue3';
import VHeading from '@/components/VHeading.vue';

export default {
  title: 'Forms/Heading',
  component: Heading,
} as Meta;

const Template: Story = (args) => ({
  components: { Heading },
  setup() {
    return { args };
  },
  template: '<Heading v-bind="args">Heading</Heading>',
});

export const Default = Template.bind({});
Default.args = {};

export const Heading1 = Template.bind({});
Heading1.args = {
  level: 1,
};

export const Heading2 = Template.bind({});
Heading2.args = {
  level: 2,
};

export const Heading3 = Template.bind({});
Heading3.args = {
  level: 3,
};
