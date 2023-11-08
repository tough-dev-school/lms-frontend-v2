---
to: src/<%= folder %>/<%= name %>/<%= name %>.stories.ts
---

import type { Meta, StoryObj } from '@storybook/vue3';
import <%= name %> from './<%= name %>.vue';

export default {
  title: '<%= name %>',
  component: <%= name %>,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { <%= name %> },
  setup() {
    return { args };
  },
  template: '<<%= name %> v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};