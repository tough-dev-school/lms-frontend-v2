import ProfileView from './ProfileView.vue';

export default {
  title: 'Pages/ProfileView',
  component: ProfileView,
};

const Template = (args) => ({
  components: { ProfileView },
  setup() {
    return { args };
  },
  template: '<ProfileView v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
