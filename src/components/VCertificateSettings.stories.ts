import type { Meta, Story } from '@storybook/vue3';
import VCertificateSettings from '@/components/VCertificateSettings.vue';

export default {
  title: 'Settings/VCertificateSettings',
  component: VCertificateSettings,
} as Meta;

const Template: Story = (args) => ({
  components: { VCertificateSettings },
  setup() {
    return { args };
  },
  template: '<VCertificateSettings v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {};
