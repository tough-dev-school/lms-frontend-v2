import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificateSettings from '@/components/VCertificateSettings/VCertificateSettings.vue';
import { usersMeRetrieveQueryKey } from '@/api/generated/hooks';
import { useQueryClient } from '@tanstack/vue-query';
import { createUserSafe } from '@/api/generated/mocks';

export default {
  title: 'Settings/VCertificateSettings',
  component: VCertificateSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificateSettings },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(usersMeRetrieveQueryKey(), createUserSafe());

    return { args };
  },
  template: '<VCertificateSettings v-bind="args"/>',
});

export const Default = {
  render: Template,
  args: {},
};
