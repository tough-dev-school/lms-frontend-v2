import type { Meta, StoryFn } from '@storybook/vue3';

import { mockMaterial } from '@/mocks/mockMaterial';
import useMaterials from '@/stores/materials';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

import { VNotionView } from '.';

export default {
  component: VNotionView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VNotionView',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VNotionView },
  setup() {
    return { args };
  },
  template: '<VNotionView v-bind="args" />',
});

export const Default = {
  decorators: [
    () => ({
      setup() {
        const materials = useMaterials();
        materials.$patch({ material: mockMaterial() });
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
        const materials = useMaterials();

        materials.material = undefined;
      },
      template: '<story />',
    }),
  ],
  render: Template,
};
