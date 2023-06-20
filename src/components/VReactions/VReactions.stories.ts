import type { Meta, StoryObj } from '@storybook/vue3';
import { VReactions } from '.';
import { VCard } from '@/components/VCard';

const meta: Meta<typeof VReactions> = {
  title: 'Base/VReactions',
  component: VReactions,
  render: () => ({
    components: { VReactions, VCard },
    template: '<VCard><VReactions >Hello World</VReactions></VCard>',
  }),
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof VReactions>;

export const Default: Story = {};
