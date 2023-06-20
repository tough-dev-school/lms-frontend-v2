import type { Meta, StoryObj } from '@storybook/vue3';
import { VReactionsPalette } from '.';
import { VCard } from '@/components/VCard';

const meta: Meta<typeof VReactionsPalette> = {
  title: 'Base/VReactionsPalette',
  component: VReactionsPalette,
  render: () => ({
    components: { VReactionsPalette, VCard },
    template:
      '<VCard><VReactionsPalette >Hello World</VReactionsPalette></VCard>',
  }),
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof VReactionsPalette>;

export const Default: Story = {};
