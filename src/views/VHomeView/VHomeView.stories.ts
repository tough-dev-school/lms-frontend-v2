import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeView from './VHomeView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import useStudies from '@/stores/studies';
import { faker } from '@faker-js/faker';
import { mockStudy, STATIC_STUDY } from '@/mocks/mockStudy';

export default {
  title: 'App/VHomeView',
  component: VHomeView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeView },
  setup() {
    return { args };
  },
  template: '<VHomeView v-bind="args" />',
});

export const Default = {
  render: Template,
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
};

export const Empty = {
  render: Template,
  decorators: [
    () => ({
      setup() {
        const studies = useStudies();
        studies.items = [];
      },
      template: '<story />',
    }),
  ],
};
