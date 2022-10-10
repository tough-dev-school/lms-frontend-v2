import NotionView from './NotionView.vue';

export default {
  title: 'Pages/NotionView',
  component: NotionView,
};

const Template = (args) => ({
  components: { NotionView },
  setup() {
    return { args };
  },
  template: '<NotionView v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
