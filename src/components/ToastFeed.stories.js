import ToastFeed from './ToastFeed.vue';
import useToasts from '../stores/toasts.ts';
import { faker } from '@faker-js/faker';

export default {
  title: 'Basic/ToastFeed',
  component: ToastFeed,
};

const Template = (args) => ({
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
