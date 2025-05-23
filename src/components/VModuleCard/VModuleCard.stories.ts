import type { Meta, StoryFn } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import VModuleCard from './VModuleCard.vue';
import type { Module } from '@/api/generated-api';

const createMockModule = (payload: Partial<Module> = {}): Module => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.commerce.productName(),
  description: faker.lorem.paragraphs(2),
  text: faker.lorem.sentence(),
  ...payload,
});

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
    module: createMockModule(),
    index: 0,
  },
};

export const WithLongTitle = {
  render: Template,
  args: {
    module: createMockModule({
      name: 'Introduction to Advanced Web Development with Modern JavaScript Frameworks and Best Practices',
    }),
    index: 1,
  },
};

export const WithoutDescription = {
  render: Template,
  args: {
    module: createMockModule({
      description: null,
    }),
    index: 2,
  },
};

export const WithoutText = {
  render: Template,
  args: {
    module: createMockModule({
      text: null,
    }),
    index: 3,
  },
};

export const MinimalContent = {
  render: Template,
  args: {
    module: createMockModule({
      description: null,
      text: null,
    }),
    index: 0,
  },
};

export const ColorVariations = {
  render: () => ({
    components: { VModuleCard },
    setup() {
      const modules = Array.from({ length: 8 }, (_, index) => ({
        module: createMockModule({
          name: `Module ${index + 1}`,
          text: `This is module ${index + 1} with color variation`,
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
    module: createMockModule({
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
