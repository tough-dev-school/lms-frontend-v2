import type { Meta, StoryFn } from '@storybook/vue3';
import { VNotionView } from '.';
import useMaterials from '@/stores/materials';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockMaterial } from '@/mocks/mockMaterial';

export default {
  title: 'App/VNotionView',
  component: VNotionView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VNotionView },
  setup() {
    return { args };
  },
  template: '<VNotionView v-bind="args" />',
});

export const Default = {
  render: Template,
  decorators: [
    () => ({
      setup() {
        const materials = useMaterials();
        materials.$patch({ material: mockMaterial() });
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
        const materials = useMaterials();

        materials.material = undefined;
      },
      template: '<story />',
    }),
  ],
};
