import type { Meta, StoryFn } from '@storybook/vue3';
import VPill from '@/components/VPill/VPill.vue';
import type { PillItem } from '@/components/VPill/VPill.vue';

export default {
  title: 'UI/VPill',
  component: VPill,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VPill },
  setup() {
    return { args };
  },
  template: '<VPill v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    items: [
      { label: 'Pill 1' },
      { label: 'Pill 2' },
      { label: 'Pill 3' },
    ] as PillItem[],
  },
};

export const WithLinks = {
  render: Template,
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ] as PillItem[],
  },
};

export const SingleItem = {
  render: Template,
  args: {
    items: [{ label: 'Single Item' }] as PillItem[],
  },
};

export const MixedItems = {
  render: Template,
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Information' },
      { label: 'Contact', to: '/contact' },
    ] as PillItem[],
  },
};
