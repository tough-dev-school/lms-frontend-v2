import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHomeworkAnswerView from './VHomeworkAnswerView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockUserSafe, STATIC_AUTHOR_1 } from '@/mocks/mockUserSafe';
import { mockQuestion } from '@/mocks/mockQuestion';
import { mockModule } from '@/mocks/mockModule';
import {
  homeworkQuestionsRetrieveQueryKey,
  homeworkAnswersRetrieveQueryKey,
  usersMeRetrieveQueryKey,
  lmsLessonsRetrieveQueryKey,
  homeworkCrosschecksListQueryKey,
} from '@/api/generated/hooks';
import { useQueryClient } from '@tanstack/vue-query';
import type {
  QuestionDetail,
  Lesson,
  CrossCheck,
  AnswerTree,
} from '@/api/generated/types';

export default {
  title: 'App/VHomeworkAnswerView',
  component: VHomeworkAnswerView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
  args: {
    questionId: 'javascript-fundamentals',
    answerId: 'answer-123',
  },
} as Meta;

// Mock data using existing patterns
const STATIC_QUESTION: QuestionDetail = {
  ...mockQuestion({
    slug: 'javascript-fundamentals',
    name: 'Основы JavaScript',
    markdown_text: `Выполните задания по основам JavaScript. Создайте простое приложение, которое демонстрирует работу с переменными, функциями и объектами.`,
    deadline: '2024-02-01T23:59:00Z',
  }),
  homework: {
    is_sent: true,
    crosschecks: {
      total: 5,
      checked: 3,
    },
    question: {
      slug: 'javascript-fundamentals',
      name: 'Основы JavaScript',
      text: 'Выполните задания по основам JavaScript',
      deadline: '2024-02-01T23:59:00Z',
    },
  },
  breadcrumbs: {
    module: mockModule({
      id: 1,
      name: 'Основы программирования',
    }),
    lesson: {
      id: 1,
    },
    course: {
      id: 1,
      name: 'Курс веб-разработки',
      slug: 'web-development',
    },
  },
  course: {
    id: 1,
    name: 'Курс веб-разработки',
    slug: 'web-development',
    homework_check_recommendations:
      'При проверке домашних заданий обратите внимание на чистоту кода, правильность реализации алгоритмов и соответствие требованиям.',
  },
};

const STATIC_LESSON: Lesson = {
  id: 1,
  question: mockQuestion(),
  homework: {
    is_sent: true,
    crosschecks: {
      total: 5,
      checked: 3,
    },
    question: {
      slug: 'javascript-fundamentals',
      name: 'Основы JavaScript',
      text: 'Выполните задания по основам JavaScript',
      deadline: '2024-02-01T23:59:00Z',
    },
  },
};

const STATIC_ANSWER = mockAnswer({
  slug: 'answer-123',
  question: 'javascript-fundamentals',
  author: STATIC_AUTHOR_1,
  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Вот мое решение задания по JavaScript. Я создал приложение для управления списком задач с использованием базовых конструкций языка.',
          },
        ],
      },
    ],
  },
  descendants: [
    mockAnswer({
      slug: 'comment-1',
      question: 'javascript-fundamentals',
      parent: 'answer-123',
      author: mockUserSafe({ seed: 2 }),
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Отличная работа! Код написан чисто и понятно.',
              },
            ],
          },
        ],
      },
    }),
  ],
});

const STATIC_CROSSCHECKS: CrossCheck[] = [
  {
    is_checked: true,
    answer: {
      slug: 'other-answer-1',
      url: '/homework/javascript-fundamentals?answerId=other-answer-1',
      question: mockQuestion({ slug: 'javascript-fundamentals' }),
      author: mockUserSafe({ seed: 3 }),
    },
  },
  {
    is_checked: true,
    answer: {
      slug: 'other-answer-2',
      url: '/homework/javascript-fundamentals?answerId=other-answer-2',
      question: mockQuestion({ slug: 'javascript-fundamentals' }),
      author: mockUserSafe({ seed: 4 }),
    },
  },
  {
    is_checked: false,
    answer: {
      slug: 'other-answer-3',
      url: '/homework/javascript-fundamentals?answerId=other-answer-3',
      question: mockQuestion({ slug: 'javascript-fundamentals' }),
      author: mockUserSafe({ seed: 5 }),
    },
  },
];

const Template: StoryFn = (args) => ({
  components: { VHomeworkAnswerView },
  setup() {
    const queryClient = useQueryClient();

    if (args.question) {
      queryClient.setQueryData(
        homeworkQuestionsRetrieveQueryKey(args.questionId),
        args.question,
      );
    }
    if (args.answer) {
      queryClient.setQueryData(
        homeworkAnswersRetrieveQueryKey(args.answerId),
        args.answer,
      );

      // Set up query data for each descendant comment
      if (args.answer.descendants) {
        args.answer.descendants.forEach((descendant: AnswerTree) => {
          queryClient.setQueryData(
            homeworkAnswersRetrieveQueryKey(descendant.slug),
            descendant,
          );
        });
      }
    }
    if (args.lesson) {
      queryClient.setQueryData(
        lmsLessonsRetrieveQueryKey(args.lesson.id),
        args.lesson,
      );
    }
    if (args.user) {
      queryClient.setQueryData(usersMeRetrieveQueryKey(), args.user);
    }
    if (args.crosschecks !== undefined) {
      queryClient.setQueryData(
        homeworkCrosschecksListQueryKey({ question: [args.questionId] }),
        { results: args.crosschecks },
      );
    }

    return { args };
  },
  template: '<VHomeworkAnswerView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    question: STATIC_QUESTION,
    answer: STATIC_ANSWER,
    lesson: STATIC_LESSON,
    user: STATIC_AUTHOR_1,
    crosschecks: STATIC_CROSSCHECKS,
  },
};

export const OtherUserAnswer = {
  render: Template,
  args: {
    answerId: 'answer-456',
    question: STATIC_QUESTION,
    answer: mockAnswer({
      ...STATIC_ANSWER,
      slug: 'answer-456',
      question: 'javascript-fundamentals',
      author: mockUserSafe({ seed: 2 }),
    }),
    lesson: STATIC_LESSON,
    user: STATIC_AUTHOR_1,
    crosschecks: [],
  },
};

export const WithoutCrossChecks = {
  render: Template,
  args: {
    question: STATIC_QUESTION,
    answer: STATIC_ANSWER,
    lesson: {
      ...STATIC_LESSON,
      homework: {
        ...STATIC_LESSON.homework!,
        crosschecks: undefined,
      },
    },
    user: STATIC_AUTHOR_1,
    crosschecks: [],
  },
};
