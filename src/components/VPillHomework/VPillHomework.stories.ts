import type { Meta, StoryObj } from '@storybook/vue3';
import VPillHomework from './VPillHomework.vue';
import dayjs from 'dayjs';

const meta = {
  component: VPillHomework,
  tags: ['autodocs'],
} satisfies Meta<typeof VPillHomework>;

export default meta;
type Story = StoryObj<typeof meta>;

const today = dayjs();
const tomorrow = today.add(1, 'day');
const yesterday = today.subtract(1, 'day');
const twoDaysAgo = today.subtract(2, 'days');

export const NotSent: Story = {
  args: {
    stats: {
      is_sent: false,
      comments: {
        comments: 0,
        hidden_before_crosscheck_completed: 0,
      },
      question: {
        name: 'Homework 1',
        text: 'Complete the assignment',
        deadline: tomorrow.toISOString(),
      },
    },
  },
};

export const NotSentOverdue: Story = {
  args: {
    stats: {
      is_sent: false,
      comments: {
        comments: 0,
        hidden_before_crosscheck_completed: 0,
      },
      question: {
        name: 'Homework 1',
        text: 'Complete the assignment',
        deadline: yesterday.toISOString(),
      },
    },
  },
};

export const Sent: Story = {
  args: {
    stats: {
      is_sent: true,
      comments: {
        comments: 2,
        hidden_before_crosscheck_completed: 0,
      },
      question: {
        name: 'Homework 1',
        text: 'Complete the assignment',
        deadline: tomorrow.toISOString(),
      },
      crosschecks: {
        checked: 2,
        total: 3,
      },
    },
  },
};

export const SentWithPendingCrosscheck: Story = {
  args: {
    stats: {
      is_sent: true,
      comments: {
        comments: 0,
        hidden_before_crosscheck_completed: 2,
      },
      question: {
        name: 'Homework 1',
        text: 'Complete the assignment',
        deadline: today.toISOString(),
      },
      crosschecks: {
        checked: 0,
        total: 3,
      },
    },
  },
};

export const SentWithFutureCrosscheck: Story = {
  args: {
    stats: {
      is_sent: true,
      comments: {
        comments: 0,
        hidden_before_crosscheck_completed: 0,
      },
      question: {
        name: 'Homework 1',
        text: 'Complete the assignment',
        deadline: twoDaysAgo.toISOString(),
      },
      crosschecks: {
        checked: 0,
        total: 3,
      },
    },
  },
};
