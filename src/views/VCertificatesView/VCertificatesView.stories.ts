import type { Meta, StoryFn } from '@storybook/vue3';
import VCertificatesView from './VCertificatesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import useDiplomas from '@/stores/diplomas';
import { diplomasData } from '@/mocks/diplomas';

export default {
  title: 'App/VCertificatesView',
  component: VCertificatesView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificatesView },
  setup() {
    return { args };
  },
  template: '<VCertificatesView v-bind="args" />',
});

export const Default = {
  render: Template,
  decorators: [
    () => ({
      setup() {
        const diplomas = useDiplomas();
        diplomas.items = diplomasData;
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
        const diplomas = useDiplomas();
        diplomas.items = [];
      },
      template: '<story />',
    }),
  ],
};
