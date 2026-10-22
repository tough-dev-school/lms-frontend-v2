import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VPillHomework from './VPillHomework.vue';
import dayjs from 'dayjs';
import { QUESTION } from '@/mocks/courses';

// Status depends on the current time, so dates are relative to today
const meta = {
  title: 'UI/VPillHomework',
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
        ...QUESTION,
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
        ...QUESTION,
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
        ...QUESTION,
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
        ...QUESTION,
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
        ...QUESTION,
        deadline: twoDaysAgo.toISOString(),
      },
    },
  },
};
