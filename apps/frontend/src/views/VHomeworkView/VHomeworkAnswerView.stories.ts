import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHomeworkAnswerView from './VHomeworkAnswerView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  createUserSafe,
  createAnswerTree,
  createQuestion,
  createModule,
  createQuestionCourse,
  createLMSCourse,
  homeworkQuestionsRetrieveQueryKey,
  homeworkAnswersRetrieveQueryKey,
  usersMeRetrieveQueryKey,
  lmsLessonsRetrieveQueryKey,
  homeworkCrosschecksListQueryKey,
} from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import type {
  QuestionDetail,
  Lesson,
  CrossCheck,
  AnswerTree,
} from '@/api/generated';

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

const STATIC_AUTHOR_1 = createUserSafe({
  uuid: 'user-uuid-001',
  first_name: 'Иван',
  last_name: 'Иванов',
  first_name_en: 'Ivan',
  last_name_en: 'Ivanov',
  random_name: 'ivan_ivanov',
  avatar: '',
  rank: '1',
  rank_label_color: '#F7CA45',
});

const STATIC_AUTHOR_2 = createUserSafe({
  uuid: 'user-uuid-002',
  first_name: 'Петр',
  last_name: 'Петров',
  first_name_en: 'Petr',
  last_name_en: 'Petrov',
  random_name: 'petr_petrov',
  avatar: '',
  rank: '2',
  rank_label_color: '#9B59B6',
});

const STATIC_AUTHOR_3 = createUserSafe({
  uuid: 'user-uuid-003',
  first_name: 'Мария',
  last_name: 'Сидорова',
  first_name_en: 'Maria',
  last_name_en: 'Sidorova',
  random_name: 'maria_sidorova',
  avatar: '',
  rank: '3',
  rank_label_color: '#3498DB',
});

const STATIC_AUTHOR_4 = createUserSafe({
  uuid: 'user-uuid-004',
  first_name: 'Алексей',
  last_name: 'Смирнов',
  first_name_en: 'Alexey',
  last_name_en: 'Smirnov',
  random_name: 'alexey_smirnov',
  avatar: '',
  rank: '1',
  rank_label_color: '#F7CA45',
});

const STATIC_QUESTION: QuestionDetail = {
  ...createQuestion({
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
  },
  breadcrumbs: {
    module: createModule({
      id: 1,
      name: 'Основы программирования',
    }),
    lesson: {
      id: 1,
    },
    course: createLMSCourse({
      id: 1,
      name: 'Курс веб-разработки',
      slug: 'web-development',
      cover: undefined,
      chat: 'https://t.me/test',
      calendar_ios: 'https://calendar.apple.com/test',
      calendar_google: 'https://calendar.google.com/test',
      homework_check_recommendations:
        'При проверке домашних заданий обратите внимание на чистоту кода, правильность реализации алгоритмов и соответствие требованиям.',
    }),
  },
  course: createQuestionCourse({
    id: 1,
    name: 'Курс веб-разработки',
    slug: 'web-development',
    cover: undefined,
    homework_check_recommendations:
      'При проверке домашних заданий обратите внимание на чистоту кода, правильность реализации алгоритмов и соответствие требованиям.',
    chat: 'https://t.me/test',
    calendar_ios: 'https://calendar.apple.com/test',
    calendar_google: 'https://calendar.google.com/test',
  }),
};

const STATIC_LESSON: Lesson = {
  id: 1,
  question: createQuestion({
    slug: 'javascript-fundamentals',
    name: 'Основы JavaScript',
    markdown_text: 'Выполните задания по основам JavaScript.',
    deadline: '2024-02-01T23:59:00Z',
  }),
  homework: {
    is_sent: true,
    crosschecks: {
      total: 5,
      checked: 3,
    },
  },
};

const STATIC_ANSWER = createAnswerTree({
  created: '2024-01-20T14:30:00Z',
  modified: '2024-01-20T14:30:00Z',
  slug: 'answer-123',
  question: 'javascript-fundamentals',
  author: STATIC_AUTHOR_1,
  parent: undefined,
  legacy_text: '',
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
  has_descendants: true,
  is_editable: true,
  reactions: [],
  descendants: [
    createAnswerTree({
      created: '2024-01-21T10:00:00Z',
      modified: '2024-01-21T10:00:00Z',
      slug: 'comment-1',
      question: 'javascript-fundamentals',
      author: STATIC_AUTHOR_2,
      parent: 'answer-123',
      legacy_text: '',
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
      has_descendants: false,
      is_editable: false,
      reactions: [],
      descendants: [],
    }),
    createAnswerTree({
      created: '2024-01-21T11:00:00Z',
      modified: '2024-01-21T11:00:00Z',
      slug: 'comment-2',
      question: 'javascript-fundamentals',
      author: STATIC_AUTHOR_3,
      parent: 'answer-123',
      legacy_text: '',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Согласен! Особенно понравился подход к организации кода.',
              },
            ],
          },
        ],
      },
      has_descendants: false,
      is_editable: false,
      reactions: [],
      descendants: [],
    }),
  ],
});

const STATIC_CROSSCHECKS: CrossCheck[] = [
  {
    id: 1,
    is_checked: true,
    answer: {
      slug: 'other-answer-1',
      url: '/homework/javascript-fundamentals?answerId=other-answer-1',
      question: createQuestion({
        slug: 'javascript-fundamentals',
        name: 'Основы JavaScript',
        markdown_text: 'Выполните задания по основам JavaScript.',
        deadline: '2024-02-01T23:59:00Z',
      }),
      author: STATIC_AUTHOR_2,
    },
  },
  {
    id: 2,
    is_checked: true,
    answer: {
      slug: 'other-answer-2',
      url: '/homework/javascript-fundamentals?answerId=other-answer-2',
      question: createQuestion({
        slug: 'javascript-fundamentals',
        name: 'Основы JavaScript',
        markdown_text: 'Выполните задания по основам JavaScript.',
        deadline: '2024-02-01T23:59:00Z',
      }),
      author: STATIC_AUTHOR_3,
    },
  },
  {
    id: 3,
    is_checked: false,
    answer: {
      slug: 'other-answer-3',
      url: '/homework/javascript-fundamentals?answerId=other-answer-3',
      question: createQuestion({
        slug: 'javascript-fundamentals',
        name: 'Основы JavaScript',
        markdown_text: 'Выполните задания по основам JavaScript.',
        deadline: '2024-02-01T23:59:00Z',
      }),
      author: STATIC_AUTHOR_4,
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
        homeworkCrosschecksListQueryKey({ question: args.questionId }),
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

const OTHER_USER_ANSWER = createAnswerTree({
  created: '2024-01-20T15:00:00Z',
  modified: '2024-01-20T15:00:00Z',
  slug: 'answer-456',
  question: 'javascript-fundamentals',
  author: STATIC_AUTHOR_2,
  parent: undefined,
  legacy_text: '',
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
  has_descendants: true,
  is_editable: false,
  reactions: [],
  descendants: [
    createAnswerTree({
      created: '2024-01-21T10:00:00Z',
      modified: '2024-01-21T10:00:00Z',
      slug: 'comment-3',
      question: 'javascript-fundamentals',
      author: STATIC_AUTHOR_3,
      parent: 'answer-456',
      legacy_text: '',
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
      has_descendants: false,
      is_editable: false,
      reactions: [],
      descendants: [],
    }),
    createAnswerTree({
      created: '2024-01-21T11:00:00Z',
      modified: '2024-01-21T11:00:00Z',
      slug: 'comment-4',
      question: 'javascript-fundamentals',
      author: STATIC_AUTHOR_4,
      parent: 'answer-456',
      legacy_text: '',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Согласен! Особенно понравился подход к организации кода.',
              },
            ],
          },
        ],
      },
      has_descendants: false,
      is_editable: false,
      reactions: [],
      descendants: [],
    }),
  ],
});

export const OtherUserAnswer = {
  render: Template,
  args: {
    answerId: 'answer-456',
    question: STATIC_QUESTION,
    answer: OTHER_USER_ANSWER,
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
