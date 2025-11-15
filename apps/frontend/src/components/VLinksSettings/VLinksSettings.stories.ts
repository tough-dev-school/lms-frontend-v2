import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLinksSettings from '@/components/VLinksSettings/VLinksSettings.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { usersMeRetrieveQueryKey } from '@/api/generated/hooks';
import { mockUserSafe } from '@/mocks/mockUserSafe';

export default {
  title: 'Settings/VLinksSettings',
  component: VLinksSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLinksSettings },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(usersMeRetrieveQueryKey(), mockUserSafe());

    return { args };
  },
  template: '<VLinksSettings v-bind="args"/>',
});

export const Default = {
  render: Template,
  args: {},
};
