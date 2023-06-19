import type { Meta, StoryFn } from '@storybook/vue3';
import VCertificateSettings from '@/components/VCertificateSettings.vue';

export default {
  title: 'Settings/VCertificateSettings',
  component: VCertificateSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificateSettings },
  setup() {
    return { args };
  },
  template: '<VCertificateSettings v-bind="args"/>',
});

export const Default = {
  render: Template,
  args: {},
};
