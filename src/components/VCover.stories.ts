import type { Meta, Story } from '@storybook/vue3';

import VCover from '@/components/VCover.vue';

export default {
  title: 'UI/VCover',
  component: VCover,
} as Meta;

const Template: Story = (args) => ({
  components: { VCover },
  setup() {
    return { args };
  },
  template: '<VCover v-bind="args" />',
});

export const AutoCover = Template.bind({});
AutoCover.args = {
  name: 'Cool Course',
};

export const RealCover = Template.bind({});
RealCover.args = {
  name: 'Cool Course',
  image: 'https://picsum.photos/1500/600',
};
