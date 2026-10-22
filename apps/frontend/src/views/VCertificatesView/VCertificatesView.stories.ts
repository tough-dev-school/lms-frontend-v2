import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificatesView from './VCertificatesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { diplomasListQueryKey } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import { DIPLOMAS, DIPLOMAS_REST_API } from '@/mocks/certificates';

export default {
  title: 'App/VCertificatesView',
  component: VCertificatesView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificatesView },
  setup() {
    useQueryClient().setQueryData(diplomasListQueryKey({ page_size: 100 }), {
      results: args.diplomas,
    });
    return { args };
  },
  template: '<VCertificatesView />',
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
