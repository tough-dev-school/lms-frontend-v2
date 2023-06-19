import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeView from './VHomeView';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { getStudiesData } from '@/mocks/studies';
import useStudies from '@/stores/studies';

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
        studies.$patch({ items: getStudiesData(5, true) });
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
