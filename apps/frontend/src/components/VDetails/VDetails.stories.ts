import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VDetails from '@/components/VDetails/VDetails.vue';

export default {
  title: 'UI/VDetails',
  component: VDetails,
} as Meta;

const Template: StoryFn = () => ({
  components: { VDetails },
  template: `
    <VDetails>
      <template #title>Как проверять домашки однокурсников</template>
      <template #summary>Нажмите, чтобы прочитать рекомендации</template>
      <p>Сначала найдите, что в решении сделано хорошо, и напишите об этом. Потом задайте вопросы там, где решение кажется спорным: автор мог учесть то, чего вы не видите.</p>
    </VDetails>
  `,
});

export const Default = {
  render: Template,
};

export const TitleOnly = {
  render: () => ({
    components: { VDetails },
    template: `
      <VDetails>
        <template #title>Рекомендации по проверке</template>
        <p>Пишите про решение, а не про человека.</p>
      </VDetails>
    `,
  }),
};
