import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VModuleCard from './VModuleCard.vue';
import { createModule } from '@/api';

export default {
  title: 'UI/VModuleCard',
  component: VModuleCard,
  argTypes: {
    index: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Index for determining card color',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VModuleCard },
  setup() {
    return { args };
  },
  template: '<VModuleCard v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    module: createModule(),
    index: 0,
  },
};

export const WithLongTitle = {
  render: Template,
  args: {
    module: createModule({
      name: 'Introduction to Advanced Web Development with Modern JavaScript Frameworks and Best Practices',
      start_date: null,
    }),
    index: 1,
  },
};

export const WithoutDescription = {
  render: Template,
  args: {
    module: createModule({
      description: null,
      start_date: null,
    }),
    index: 2,
  },
};

export const WithoutText = {
  render: Template,
  args: {
    module: createModule({
      text: null,
    }),
    index: 3,
  },
};

export const WithStartDate = {
  render: Template,
  args: {
    module: createModule({
      start_date: '2025-01-01',
    }),
    index: 4,
  },
};

export const MinimalContent = {
  render: Template,
  args: {
    module: createModule({
      description: null,
      text: null,
      start_date: null,
    }),
    index: 0,
  },
};

export const ColorVariations = {
  render: () => ({
    components: { VModuleCard },
    setup() {
      const modules = Array.from({ length: 8 }, (_, index) => ({
        module: createModule({
          name: `Module ${index + 1}`,
          text: `This is module ${index + 1} with color variation`,
          start_date: null,
        }),
        index,
      }));
      return { modules };
    },
    template: `
      <div class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-16">
        <VModuleCard 
          v-for="({ module, index }, i) in modules" 
          :key="i"
          :module="module" 
          :index="index" 
        />
      </div>
    `,
  }),
};

export const WithRichDescription = {
  render: Template,
  args: {
    module: createModule({
      description: `
        <p>This module covers <strong>advanced topics</strong> in web development:</p>
        <ul>
          <li>Component architecture</li>
          <li>State management</li>
          <li>Performance optimization</li>
        </ul>
        <p>You'll learn practical skills that can be applied immediately in real-world projects.</p>
      `,
    }),
    index: 1,
  },
};
