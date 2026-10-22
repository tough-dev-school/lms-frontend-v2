import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLinksSettings from '@/components/VLinksSettings/VLinksSettings.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { usersMeRetrieveQueryKey } from '@/api/generated';
import { NEW_STUDENT, STUDENT } from '@/mocks/users';

export default {
  title: 'Settings/VLinksSettings',
  component: VLinksSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLinksSettings },
  setup() {
    useQueryClient().setQueryData(usersMeRetrieveQueryKey(), args.user);
    return { args };
  },
  template: '<VLinksSettings />',
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
