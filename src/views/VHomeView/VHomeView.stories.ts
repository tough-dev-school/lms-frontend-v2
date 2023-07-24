import type { Meta, StoryFn } from '@storybook/vue3';

import { STATIC_STUDY, mockStudy } from '@/mocks/mockStudy';
import useStudies from '@/stores/studies';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { faker } from '@faker-js/faker';

import { VHomeView } from '.';

export default {
  component: VHomeView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VHomeView',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeView },
  setup() {
    return { args };
  },
  template: '<VHomeView v-bind="args" />',
});

export const Default = {
  decorators: [
    () => ({
      setup() {
        const studies = useStudies();
        studies.$patch({
          items: [STATIC_STUDY],
        });
      },
      template: '<story />',
    }),
  ],
  render: Template,
};

export const Empty = {
  decorators: [
    () => ({
      setup() {
        const studies = useStudies();
        studies.items = [];
      },
      template: '<story />',
    }),
  ],
  render: Template,
};
