import type { Meta, StoryFn } from '@storybook/vue3';
import VLinksSettings from '@/components/VLinksSettings/VLinksSettings.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { userKeys } from '@/query';
import { mockUserSafe } from '@/mocks/mockUserSafe';

export default {
  title: 'Settings/VLinksSettings',
  component: VLinksSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLinksSettings },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(userKeys.me(), mockUserSafe());

    return { args };
  },
  template: '<VLinksSettings v-bind="args"/>',
});

export const Default = {
  render: Template,
  args: {},
};
