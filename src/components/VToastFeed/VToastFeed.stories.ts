import type { Meta, StoryFn } from '@storybook/vue3';

import { VToastFeed } from '@/components/VToastFeed';
import useToasts from '@/stores/toasts';
import { faker } from '@faker-js/faker';

export default {
  component: VToastFeed,
  title: 'Toasts/VToastFeed',
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
  args: {},
  render: Template,
};
