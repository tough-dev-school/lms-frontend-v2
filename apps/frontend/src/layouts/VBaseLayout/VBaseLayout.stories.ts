import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VBaseLayout from '@/layouts/VBaseLayout/VBaseLayout.vue';

export default {
  title: 'Layouts/VBaseLayout',
  component: VBaseLayout,
  parameters: { layout: 'fullscreen' },
} as Meta;

export const Default: StoryFn = () => ({
  components: { VBaseLayout },
  template: `
    <VBaseLayout>
      <p>Страница без шапки. Кнопка чата поддержки закреплена в правом нижнем углу.</p>
    </VBaseLayout>
  `,
});
