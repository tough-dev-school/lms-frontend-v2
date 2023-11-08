import type { Meta, StoryFn } from '@storybook/vue3';
import VToastFeed from '@/components/VToastFeed/VToastFeed.vue';
import useToasts from '@/stores/toasts';
import { faker } from '@faker-js/faker';

export default {
  title: 'Toasts/VToastFeed',
  component: VToastFeed,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VToastFeed },
  setup() {
    const toasts = useToasts();
    toasts.$reset();
    [...Array(10)].forEach(() => toasts.addMessage(faker.lorem.sentence()));

    return { args };
  },
  template: '<VToastFeed v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};
