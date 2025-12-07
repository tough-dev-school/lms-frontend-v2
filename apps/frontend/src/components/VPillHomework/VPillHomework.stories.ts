import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VPillHomework from './VPillHomework.vue';
import dayjs from 'dayjs';
import { createQuestion } from '@/api/generated';

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
    lesson: {
      homework: {
        is_sent: false,
        comments: {
          comments: 0,
          hidden_before_crosscheck_completed: 0,
        },
      },
      question: {
        ...createQuestion(),
        name: 'Homework 1',
        slug: 'homework-1',
        deadline: tomorrow.toISOString(),
      },
    },
  },
};

export const NotSentOverdue: Story = {
  args: {
    lesson: {
      homework: {
        is_sent: false,
        comments: {
          comments: 0,
          hidden_before_crosscheck_completed: 0,
        },
      },
      question: {
        ...createQuestion(),
        name: 'Homework 1',
        slug: 'homework-1',
        deadline: yesterday.toISOString(),
      },
    },
  },
};

export const Sent: Story = {
  args: {
    lesson: {
      homework: {
        is_sent: true,
        comments: {
          comments: 2,
          hidden_before_crosscheck_completed: 0,
        },
        crosschecks: {
          checked: 2,
          total: 3,
        },
      },
      question: {
        ...createQuestion(),
        name: 'Homework 1',
        slug: 'homework-1',
        deadline: tomorrow.toISOString(),
      },
    },
  },
};

export const SentWithPendingCrosscheck: Story = {
  args: {
    lesson: {
      homework: {
        is_sent: true,
        comments: {
          comments: 0,
          hidden_before_crosscheck_completed: 2,
        },
        crosschecks: {
          checked: 0,
          total: 3,
        },
      },
      question: {
        ...createQuestion(),
        name: 'Homework 1',
        slug: 'homework-1',
        deadline: today.toISOString(),
      },
    },
  },
};

export const SentWithFutureCrosscheck: Story = {
  args: {
    lesson: {
      homework: {
        is_sent: true,
        comments: {
          comments: 0,
          hidden_before_crosscheck_completed: 0,
        },
        crosschecks: {
          checked: 0,
          total: 3,
        },
      },
      question: {
        ...createQuestion(),
        name: 'Homework 1',
        slug: 'homework-1',
        deadline: twoDaysAgo.toISOString(),
      },
    },
  },
};
