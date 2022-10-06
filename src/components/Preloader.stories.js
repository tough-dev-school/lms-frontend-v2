import Preloader from './Preloader.vue';

export default {
  title: 'UI/Preloader',
  component: Preloader,
};

const Template = (args) => ({
  components: { Preloader },
  setup() {
    return { args };
  },
  template: '<Preloader v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = { message: 'This is a toast!' };
