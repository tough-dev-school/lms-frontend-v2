import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificateSettings from '@/components/VCertificateSettings/VCertificateSettings.vue';
import { usersMeRetrieveQueryKey, createUserSafe } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';

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
