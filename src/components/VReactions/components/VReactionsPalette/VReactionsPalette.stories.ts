import type { Meta, StoryObj } from '@storybook/vue3';
import { VReactionsPalette } from '.';

const meta: Meta<typeof VReactionsPalette> = {
  title: 'Base/VReactionsPalette',
  component: VReactionsPalette,
  render: () => ({
    components: { VReactionsPalette },
    template: '<VReactionsPalette >Hello World</VReactionsPalette>',
  }),
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof VReactionsPalette>;

export const Default: Story = {};
