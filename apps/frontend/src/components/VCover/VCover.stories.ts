import type { Meta, StoryFn } from '@storybook/vue3-vite';

import VCover from '@/components/VCover/VCover.vue';
import {
  COURSE,
  COURSE_WITH_LONG_NAME,
  COURSE_WITH_TARIFF_IN_NAME,
} from '@/mocks/courses';

export default {
  title: 'UI/VCover',
  component: VCover,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCover },
  setup() {
    return { args };
  },
  template: '<VCover v-bind="args" />',
});

export const AutoCover = {
  render: Template,

  args: {
    name: COURSE.name,
  },
};

// Text in parentheses is cut off
export const TariffInName = {
  render: Template,

  args: {
    name: COURSE_WITH_TARIFF_IN_NAME.name,
  },
};

export const LongName = {
  render: Template,

  args: {
    name: COURSE_WITH_LONG_NAME.name,
  },
};

export const RealCover = {
  render: Template,

  args: {
    name: COURSE.name,
    image: 'https://picsum.photos/seed/rest-api/1500/600',
  },
};
