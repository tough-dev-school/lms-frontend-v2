import { RecommendedVideoProviderEnum } from '@/api/generated';
import type {
  Breadcrumbs,
  Call,
  Course,
  LMSCourse,
  Lesson,
  ModuleDetail,
  NotionMaterial,
  Question,
} from '@/api/generated';

const HOMEWORK_CHECK_RECOMMENDATIONS =
  'Сначала найдите, что в решении сделано хорошо, и напишите об этом. Потом задайте вопросы там, где решение кажется спорным: автор мог учесть то, чего вы не видите. Пишите про решение, а не про человека.';

export const COURSE: Course = {
  id: 1,
  slug: 'async-arch-7',
  name: 'Асинхронная архитектура',
  product_name: 'Асинхронная архитектура',
  tariff_name: 'С проверкой домашки',
  home_page_slug: 'async-arch',
  cover: null,
  chat: 'https://t.me/+aSyNcArCh7FlOw',
  calendar_ios: 'webcal://calendar.tough-dev.school/async-arch-7.ics',
  calendar_google:
    'https://calendar.google.com/calendar/r?cid=webcal://calendar.tough-dev.school/async-arch-7.ics',
  links: [
    {
      name: 'Репозиторий с примерами',
      url: 'https://github.com/tough-dev-school/async-arch-examples',
    },
    {
      name: 'Доска для Event Storming в Miro',
      url: 'https://miro.com/app/board/uXjVN-popug-inc/',
    },
  ],
};

export const COURSE_WITHOUT_EXTRA_INFO: Course = {
  id: 2,
  slug: 'delegation-3',
  name: 'Самому не проще',
  product_name: 'Самому не проще',
  tariff_name: null,
  home_page_slug: 'delegation',
  cover: null,
  chat: null,
  calendar_ios: null,
  calendar_google: null,
  links: [],
};

// Text in parentheses is a tariff, the course cover hides it
export const COURSE_WITH_TARIFF_IN_NAME: Course = {
  id: 3,
  slug: 'python-testing-4',
  name: 'Тестирование в Python (самостоятельный)',
  product_name: 'Тестирование в Python',
  tariff_name: 'Самостоятельный',
  home_page_slug: 'python-testing',
  cover: null,
  chat: 'https://t.me/+pYtEsTiNg4',
  calendar_ios: null,
  calendar_google: null,
  links: [],
};

export const COURSE_WITH_LONG_NAME: Course = {
  id: 4,
  slug: 'teamlead-2',
  name: 'Управление командой разработки: от первого найма до процессов, которые работают без вас',
  product_name: 'Управление командой разработки',
  tariff_name: null,
  home_page_slug: 'teamlead',
  cover: null,
  chat: null,
  calendar_ios: null,
  calendar_google: null,
  links: [],
};

export const COURSES: Course[] = [
  COURSE,
  COURSE_WITHOUT_EXTRA_INFO,
  COURSE_WITH_TARIFF_IN_NAME,
];

export const LMS_COURSE: LMSCourse = {
  id: COURSE.id,
  slug: COURSE.slug,
  name: COURSE.name,
  chat: COURSE.chat,
  calendar_ios: COURSE.calendar_ios,
  calendar_google: COURSE.calendar_google,
  homework_check_recommendations: HOMEWORK_CHECK_RECOMMENDATIONS,
};

export const MODULE_EVENT_STORMING: ModuleDetail = {
  id: 11,
  name: 'Event Storming и моделирование домена',
  start_date: '2025-11-10T00:00:00Z',
  has_started: true,
  description:
    'Разбираем бизнес-требования Попуг Инк., находим события и границы сервисов',
  text: '<p>В первом модуле мы разберём требования к таск-трекеру Попуг Инк. и проведём Event Storming. К концу недели у вас будет модель домена, список событий и первые границы сервисов.</p><p>Созвон в понедельник в 19:00 по Москве. Запись появится здесь через пару часов после окончания.</p>',
  lesson_count: 3,
  single_lesson_id: 0,
};

export const MODULE_COMMUNICATION: ModuleDetail = {
  id: 12,
  name: 'Коммуникации между сервисами',
  start_date: '2025-11-24T00:00:00Z',
  has_started: true,
  description:
    'Синхронные и асинхронные вызовы, брокеры сообщений, CUD- и бизнес-события',
  text: '<p>Выбираем, где сервисам хватит HTTP-запроса, а где нужен брокер. Сравниваем Kafka и RabbitMQ на задачах Попуг Инк.</p>',
  lesson_count: 2,
  single_lesson_id: 0,
};

export const MODULE_SCHEMA_EVOLUTION: ModuleDetail = {
  id: 13,
  name: 'Эволюция схемы событий',
  start_date: '2025-12-08T00:00:00Z',
  has_started: true,
  description:
    'Версионирование событий, Schema Registry и миграции без даунтайма',
  text: null,
  lesson_count: 2,
  single_lesson_id: 0,
};

export const MODULE_ANALYTICS: ModuleDetail = {
  id: 14,
  name: 'Аналитика и отчётность',
  start_date: '2026-01-19T00:00:00Z',
  has_started: false,
  description: 'Собираем дашборды для топ-менеджмента из потока событий',
  text: null,
  lesson_count: 2,
  single_lesson_id: 0,
};

export const MODULE_BONUS: ModuleDetail = {
  id: 15,
  name: 'Бонус: разбор выпускных проектов',
  start_date: null,
  has_started: false,
  description: null,
  text: null,
  lesson_count: 1,
  single_lesson_id: 0,
};

export const MODULES: ModuleDetail[] = [
  MODULE_EVENT_STORMING,
  MODULE_COMMUNICATION,
  MODULE_SCHEMA_EVOLUTION,
  MODULE_ANALYTICS,
  MODULE_BONUS,
];

export const CALL: Call = {
  name: 'Вводный созвон: Event Storming на примере Попуг Инк.',
  description:
    'Знакомимся, разбираем требования к таск-трекеру и вместе находим первые доменные события',
  url: 'https://zoom.us/j/84213397520',
  datetime: '2025-11-10T16:00:00Z',
  video: [
    {
      provider: 'youtube',
      embed: 'https://www.youtube.com/embed/1pDsEqHtQs0',
      src: 'https://www.youtube.com/watch?v=1pDsEqHtQs0',
    },
    {
      provider: 'rutube',
      embed: 'https://rutube.ru/play/embed/7f3a1c9e2b4d6a8f0e1c3b5d7a9f2e4c',
      src: 'https://rutube.ru/video/7f3a1c9e2b4d6a8f0e1c3b5d7a9f2e4c/',
    },
  ],
  recommended_video_provider: RecommendedVideoProviderEnum.youtube,
};

export const UPCOMING_CALL: Call = {
  name: 'Q&A: вопросы по домашке и Event Storming',
  description: 'Отвечаем на вопросы, которые накопились за неделю',
  url: 'https://zoom.us/j/84213397521',
  datetime: '2026-01-12T16:00:00Z',
  video: [],
  recommended_video_provider: null,
};

export const QUESTION: Question = {
  slug: 'popug-inc-event-storming',
  name: 'Event Storming для таск-трекера Попуг Инк.',
  markdown_text: `Топ-менеджмент Попуг Инк. решил, что попуги работают недостаточно эффективно, и заказал новый таск-трекер.

## Требования

1. Таск-трекер доступен всем сотрудникам компании.
2. Новые задачи может создать кто угодно. У задачи есть описание, статус «выполнена» или «птичка в клетке» и исполнитель.
3. Менеджеры и администраторы могут нажать кнопку «заассайнить задачи». Тогда все открытые задачи случайно распределяются между попугами.
4. Каждый попуг видит список своих задач и может отметить задачу выполненной.

## Что нужно сделать

- Проведите Event Storming по требованиям выше
- Выделите команды, события, агрегаты и акторов
- Нарисуйте границы сервисов и подпишите, какие события между ними ходят

Решение можно оформить в Miro или Excalidraw. Пришлите ссылку на доску и пару абзацев о том, какие решения вы приняли и почему.`,
  deadline: '2025-11-17T20:59:00Z',
};

export const QUESTION_COMMUNICATION: Question = {
  slug: 'popug-inc-communication',
  name: 'Коммуникации между сервисами Попуг Инк.',
  markdown_text: `Опишите, как сервисы из прошлой домашки общаются между собой.

- Какие вызовы синхронные, а какие асинхронные
- Какие события вы считаете CUD-событиями, а какие бизнес-событиями
- Что произойдёт, если брокер сообщений будет недоступен 15 минут`,
  deadline: '2025-12-01T20:59:00Z',
};

// The id matches the page in mockNotionMaterial
export const MATERIAL: NotionMaterial = {
  id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
  title: 'Как провести Event Storming: пошаговая инструкция',
};

export const LESSON_CALL: Lesson = {
  id: 101,
  call: CALL,
  homework: { is_sent: false },
  question: QUESTION,
};

export const LESSON_MATERIAL: Lesson = {
  id: 102,
  material: MATERIAL,
  homework: { is_sent: false },
  question: QUESTION,
};

export const LESSON_HOMEWORK: Lesson = {
  id: 103,
  homework: {
    is_sent: true,
    crosschecks: { total: 3, checked: 2 },
    comments: { comments: 7, hidden_before_crosscheck_completed: 2 },
  },
  question: QUESTION,
};

export const LESSON_HOMEWORK_NOT_SENT: Lesson = {
  id: 104,
  homework: {
    is_sent: false,
    comments: { comments: 0, hidden_before_crosscheck_completed: 0 },
  },
  question: QUESTION_COMMUNICATION,
};

export const LESSONS: Lesson[] = [
  LESSON_CALL,
  LESSON_MATERIAL,
  LESSON_HOMEWORK,
];

export const BREADCRUMBS: Breadcrumbs = {
  course: LMS_COURSE,
  module: MODULE_EVENT_STORMING,
  lesson: { id: LESSON_HOMEWORK.id },
};
