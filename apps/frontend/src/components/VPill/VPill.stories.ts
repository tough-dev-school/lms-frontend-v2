import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VPill from '@/components/VPill/VPill.vue';
import VPillItem from '@/components/VPill/VPillItem.vue';

export default {
  title: 'UI/VPill',
  component: VPill,
} as Meta;

export const Default: StoryFn = () => ({
  components: { VPill, VPillItem },
  template: `
    <VPill>
      <VPillItem>Домашка: Отправлена</VPillItem>
      <VPillItem>Работы на проверку: 2 / 3</VPillItem>
      <VPillItem>Дедлайн: 17 ноября, 23:59</VPillItem>
    </VPill>
  `,
});

export const WithLinks: StoryFn = () => ({
  components: { VPill, VPillItem },
  template: `
    <VPill>
      <VPillItem to="https://example.com/chat/rest-api-3">Чат</VPillItem>
      <VPillItem to="webcal://example.com/calendar/rest-api-3.ics">Календарь iOS</VPillItem>
      <VPillItem to="https://example.com/calendar/rest-api-3/google">Google Календарь</VPillItem>
    </VPill>
  `,
});

export const SingleItem: StoryFn = () => ({
  components: { VPill, VPillItem },
  template: `
    <VPill>
      <VPillItem>Домашка: Не отправлена</VPillItem>
    </VPill>
  `,
});
