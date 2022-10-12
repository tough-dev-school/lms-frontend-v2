import Button from './Button.vue';

export default {
  title: 'Forms/Button',
  component: Button,
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">Press me</Button>',
});

export const Default = Template.bind({});
Default.args = {
  type: 'button',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
};
