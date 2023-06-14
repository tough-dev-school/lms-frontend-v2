import type { Meta, StoryFn } from '@storybook/vue3';
import VNotionView from './VNotionView.vue';
import useMaterials from '@/stores/materials';
import { getMaterialsData } from '@/mocks/materials';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

export default {
  title: 'App/VNotionView',
  component: VNotionView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VNotionView },
  setup() {
    const materials = useMaterials();
    materials.$patch({ material: getMaterialsData() });
    return { args };
  },
  template: '<VNotionView v-bind="args" />',
});

export const Default = {
  render: Template,
};
