import type { Meta, StoryFn } from '@storybook/vue3';
import VNotionView from './VNotionView.vue';
import useMaterials from '@/stores/materials';
import { getMaterialsData } from '@/mocks/materials';

export default {
  title: 'App/VNotionView',
  component: VNotionView,
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
