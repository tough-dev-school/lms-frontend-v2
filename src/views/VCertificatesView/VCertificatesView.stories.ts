import type { Meta, StoryFn } from '@storybook/vue3';
import VCertificatesView from './VCertificatesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

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
};
