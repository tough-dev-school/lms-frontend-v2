import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificatesView from './VCertificatesView.vue';
import { DIPLOMAS, DIPLOMAS_REST_API } from '@/mocks/certificates';

export default {
  title: 'App/VCertificatesView',
  component: VCertificatesView,
  parameters: { layout: 'fullscreen' },
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
  args: {
    diplomas: DIPLOMAS,
  },
};

export const SingleCourse = {
  render: Template,
  args: {
    diplomas: DIPLOMAS_REST_API,
  },
};

export const Empty = {
  render: Template,
  args: {
    diplomas: [],
  },
};
