import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAvatarSettings from '@/components/VAvatarSettings/VAvatarSettings.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { usersMeRetrieveQueryKey } from '@/api/generated';
import { STUDENT } from '@/mocks/users';

export default {
  title: 'Settings/VAvatarSettings',
  component: VAvatarSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAvatarSettings },
  setup() {
    useQueryClient().setQueryData(usersMeRetrieveQueryKey(), args.user);
    return { args };
  },
  template: '<VAvatarSettings />',
});

export const Default = {
  render: Template,
  args: {
    user: STUDENT,
  },
};
