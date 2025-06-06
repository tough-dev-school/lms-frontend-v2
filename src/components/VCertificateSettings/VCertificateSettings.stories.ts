import type { Meta, StoryFn } from '@storybook/vue3';
import VCertificateSettings from '@/components/VCertificateSettings/VCertificateSettings.vue';
import { userKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import { mockUserSafe } from '@/mocks/mockUserSafe';

export default {
  title: 'Settings/VCertificateSettings',
  component: VCertificateSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificateSettings },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(userKeys.me(), mockUserSafe());

    return { args };
  },
  template: '<VCertificateSettings v-bind="args"/>',
});

export const Default = {
  render: Template,
  args: {},
};
