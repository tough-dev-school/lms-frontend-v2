import type { Meta, StoryFn } from '@storybook/vue3';

import { VCertificateSettings } from '@/components/VCertificateSettings';

export default {
  component: VCertificateSettings,
  title: 'Settings/VCertificateSettings',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificateSettings },
  setup() {
    return { args };
  },
  template: '<VCertificateSettings v-bind="args"/>',
});

export const Default = {
  args: {},
  render: Template,
};
