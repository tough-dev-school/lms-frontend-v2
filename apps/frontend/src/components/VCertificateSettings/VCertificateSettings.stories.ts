import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificateSettings from '@/components/VCertificateSettings/VCertificateSettings.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { usersMeRetrieveQueryKey } from '@/api/generated';
import { NEW_STUDENT, STUDENT } from '@/mocks/users';

export default {
  title: 'Settings/VCertificateSettings',
  component: VCertificateSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificateSettings },
  setup() {
    useQueryClient().setQueryData(usersMeRetrieveQueryKey(), args.user);
    return { args };
  },
  template: '<VCertificateSettings />',
});

export const Default = {
  render: Template,
  args: {
    user: STUDENT,
  },
};

export const Empty = {
  render: Template,
  args: {
    user: NEW_STUDENT,
  },
};
