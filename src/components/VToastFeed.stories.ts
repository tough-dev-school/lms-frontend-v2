import type { Meta, Story } from '@storybook/vue3';
import VToastFeed from '@/components/VToastFeed.vue';
import useToasts from '@/stores/toasts';
import { faker } from '@faker-js/faker';

export default {
  title: 'Toasts/VToastFeed',
  component: VToastFeed,
} as Meta;

const Template: Story = (args) => ({
  components: { VToastFeed },
  setup() {
    const toasts = useToasts();
    toasts.$reset();
    [...Array(10)].forEach(() => toasts.addMessage(faker.lorem.sentence()));

    return { args };
  },
  template: '<VToastFeed v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
