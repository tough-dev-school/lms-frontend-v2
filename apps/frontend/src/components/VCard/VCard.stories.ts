import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCard from '@/components/VCard/VCard.vue';
import VButton from '@/components/VButton/VButton.vue';

export default {
  title: 'UI/VCard',
  component: VCard,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCard },
  setup() {
    return { args };
  },
  template:
    '<VCard v-bind="args">Ссылки на профили появятся в сертификате и рядом с вашими ответами на домашки.</VCard>',
});

export const Default = {
  render: Template,
  args: {},
};

export const WithTitle = {
  render: Template,
  args: {
    title: 'Ссылки на профили',
  },
};

export const WithFooter = {
  render: () => ({
    components: { VCard, VButton },
    template: `
      <VCard title="Смена пароля">
        Пароль должен быть не короче 8 символов.
        <template #footer>
          <VButton>Сохранить</VButton>
        </template>
      </VCard>
    `,
  }),
};
