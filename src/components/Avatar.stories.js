import Avatar from './Avatar.vue';

export default {
  title: 'Basic/Avatar',
  component: Avatar,
};

const Template = (args) => ({
  components: { Avatar },
  setup() {
    return { args };
  },
  template: '<Avatar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  name: 'John',
  surname: 'Doe',
};
