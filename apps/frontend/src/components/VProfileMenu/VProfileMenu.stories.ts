import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
import { usersMeRetrieveQueryKey } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import { NEW_STUDENT, STUDENT } from '@/mocks/users';

export default {
  title: 'UI/VProfileMenu',
  component: VProfileMenu,
  decorators: [
    () => ({
      template: '<div class="flex justify-end"><story /></div>',
    }),
  ],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VProfileMenu },
  setup() {
    useQueryClient().setQueryData(usersMeRetrieveQueryKey(), args.user);
    return { args };
  },
  template: '<VProfileMenu />',
});

export const Default = {
  render: Template,
  args: {
    user: STUDENT,
  },
};

// Without certificate names the menu offers to fill them in and shows the random name
export const WithoutCertificateData = {
  render: Template,
  args: {
    user: NEW_STUDENT,
  },
};
