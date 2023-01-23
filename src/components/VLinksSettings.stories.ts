import type { Meta, Story } from '@storybook/vue3';
import VLinksSettings from '@/components/VLinksSettings.vue';

export default {
  title: 'Settings/VLinksSettings',
  component: VLinksSettings,
} as Meta;

const Template: Story = (args) => ({
  components: { VLinksSettings },
  setup() {
    return { args };
  },
  template: '<VLinksSettings v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {};
