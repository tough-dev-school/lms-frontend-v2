import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
import VCard from '@/components/VCard/VCard.vue';

export default {
  title: 'Layouts/VPublicLayout',
  component: VPublicLayout,
  parameters: { layout: 'fullscreen' },
} as Meta;

export const Default: StoryFn = () => ({
  components: { VPublicLayout, VCard },
  template: `
    <VPublicLayout>
      <VCard title="Вход">
        Публичные страницы, например вход и восстановление пароля, показывают только логотип в шапке.
      </VCard>
    </VPublicLayout>
  `,
});
