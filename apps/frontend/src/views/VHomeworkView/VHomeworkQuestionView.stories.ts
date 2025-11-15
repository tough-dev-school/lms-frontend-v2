import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHomeworkQuestionView from './VHomeworkQuestionView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockQuestion } from '@/mocks/mockQuestion';
import { mockModule } from '@/mocks/mockModule';
import {
  homeworkQuestionsRetrieveQueryKey,
  lmsLessonsRetrieveQueryKey,
} from '@/api/generated/hooks';
import { useQueryClient } from '@tanstack/vue-query';
import type { QuestionDetail, Lesson } from '@/api/generated-api';

export default {
  title: 'App/VHomeworkQuestionView',
  component: VHomeworkQuestionView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
  args: {
    questionId: 'react-components',
  },
} as Meta;

// Mock data using existing patterns
const STATIC_QUESTION: QuestionDetail = {
  slug: 'react-components',
  name: 'Создание React компонентов',
  markdown_text: `# Задание: Создание React компонентов
  В этом задании вам необходимо создать несколько React компонентов для простого приложения.
  ## Требования:
  - Создайте компонент Header с навигационным меню
  - Реализуйте компонент ProductCard для отображения товара
  - Добавьте обработчики событий для пользовательского взаимодействия
  Убедитесь, что ваш код следует лучшим практикам React и содержит необходимые комментарии.`,
  deadline: '2024-02-15T23:59:00Z',
  homework: {
    is_sent: false,
    question: {
      slug: 'react-components',
      name: 'Создание React компонентов',
      text: 'Создайте несколько React компонентов согласно требованиям',
      deadline: '2024-02-15T23:59:00Z',
    },
  },
  breadcrumbs: {
    module: mockModule({
      id: 2,
      name: 'React разработка',
    }),
    lesson: {
      id: 2,
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
      'При проверке обратите внимание на структуру компонентов, правильность использования props и читаемость кода.',
  },
};

const STATIC_LESSON: Lesson = {
  id: 2,
  question: mockQuestion(),
  homework: {
    is_sent: false,
    question: {
      slug: 'react-components',
      name: 'Создание React компонентов',
      text: 'Создайте несколько React компонентов согласно требованиям',
      deadline: '2024-02-15T23:59:00Z',
    },
  },
};

const Template: StoryFn = (args) => ({
  components: { VHomeworkQuestionView },
  setup() {
    const queryClient = useQueryClient();

    if (args.question) {
      queryClient.setQueryData(
        homeworkQuestionsRetrieveQueryKey(args.questionId),
        args.question,
      );
    }
    if (args.lesson) {
      queryClient.setQueryData(
        lmsLessonsRetrieveQueryKey(args.lesson.id),
        args.lesson,
      );
    }

    return { args };
  },
  template: '<VHomeworkQuestionView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    question: STATIC_QUESTION,
    lesson: STATIC_LESSON,
  },
};
