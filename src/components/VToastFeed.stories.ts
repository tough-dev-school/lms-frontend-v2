import type { Meta, Story } from '@storybook/vue3';
import VToastFeed from '@/components/VToastFeed.vue';
import useToasts from '@/stores/toasts';
import { faker } from '@faker-js/faker';

export default {
  title: 'Toasts/ToastFeed',
  component: ToastFeed,
} as Meta;

const Template: Story = (args) => ({
  components: { ToastFeed },
  setup() {
    const toasts = useToasts();
    toasts.$reset();
    [...Array(10)].forEach(() => toasts.addMessage(faker.lorem.sentence()));

    return { args };
  },
  template: '<ToastFeed v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
