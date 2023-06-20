import type { Meta, StoryObj } from '@storybook/vue3';
import { VReaction } from '.';

const meta: Meta<typeof VReaction> = {
  title: 'Base/VReaction',
  component: VReaction,
  render: () => ({
    components: { VReaction },
    template: '<VReaction >Hello World</VReaction>',
  }),
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof VReaction>;

export const Default: Story = {};
