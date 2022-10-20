import FeedbackGuide from './FeedbackGuide.vue';

export default {
  title: 'UI/FeedbackGuide',
  component: FeedbackGuide,
};

const Template = (args) => ({
  components: { FeedbackGuide },
  setup() {
    return { args };
  },
  template: '<FeedbackGuide v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
