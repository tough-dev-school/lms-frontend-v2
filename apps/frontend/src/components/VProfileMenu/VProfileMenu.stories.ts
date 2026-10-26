import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
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

const Template: StoryFn = () => ({
  components: { VProfileMenu },
  template: '<VProfileMenu />',
});

export const Default = {
  render: Template,
  parameters: { inertia: { props: { user: STUDENT } } },
};

// Without certificate names the menu offers to fill them in and shows the random name
export const WithoutCertificateData = {
  render: Template,
  parameters: { inertia: { props: { user: NEW_STUDENT } } },
};
