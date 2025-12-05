import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHomeworkQuestionView from './VHomeworkQuestionView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockQuestion } from '@/mocks/mockQuestion';
import { mockModule } from '@/mocks/mockModule';
import { homeworkKeys, lmsKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import type { QuestionDetail, Lesson } from '@/api/generated/generated-api';
import { mockLMSCourse } from '@/mocks/mockLMSCourse';

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
      ...mockLMSCourse(),
      id: 1,
      name: 'Курс веб-разработки',
      slug: 'web-development',
      chat: 'https://t.me/test',
      calendar_ios: 'https://calendar.apple.com/test',
      calendar_google: 'https://calendar.google.com/test',
    },
  },
  course: {
    chat: 'https://t.me/test',
    calendar_ios: 'https://calendar.apple.com/test',
    calendar_google: 'https://calendar.google.com/test',
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
  },
};

const Template: StoryFn = (args) => ({
  components: { VHomeworkQuestionView },
  setup() {
    const queryClient = useQueryClient();

    if (args.question) {
      queryClient.setQueryData(
        homeworkKeys.question(args.questionId),
        args.question,
      );
    }
    if (args.lesson) {
      queryClient.setQueryData(lmsKeys.lesson(args.lesson.id), args.lesson);
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
