import type { Meta, Story } from '@storybook/vue3';
import VPasswordSettings from '@/components/VPasswordSettings.vue';

export default {
  title: 'Settings/VPasswordSettings',
  component: VPasswordSettings,
} as Meta;

const Template: Story = (args) => ({
  components: { VPasswordSettings },
  setup() {
    return { args };
  },
  template: '<VPasswordSettings v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {};
