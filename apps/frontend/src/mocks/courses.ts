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

// All courses, links and texts are made up, links point to example.com

const HOMEWORK_CHECK_RECOMMENDATIONS =
  'Сначала найдите, что в решении сделано хорошо, и напишите об этом. Потом задайте вопросы там, где решение кажется спорным: автор мог учесть то, чего вы не видите. Пишите про решение, а не про человека.';

export const COURSE: Course = {
  id: 1,
  slug: 'rest-api-3',
  name: 'Проектирование REST API',
  product_name: 'Проектирование REST API',
  tariff_name: 'С проверкой домашки',
  home_page_slug: 'rest-api',
  cover: null,
  chat: 'https://example.com/chat/rest-api-3',
  calendar_ios: 'webcal://example.com/calendar/rest-api-3.ics',
  calendar_google: 'https://example.com/calendar/rest-api-3/google',
  links: [
    {
      name: 'Репозиторий с примерами',
      url: 'https://example.com/repo/rest-api-examples',
    },
    {
      name: 'Шаблон для домашек',
      url: 'https://example.com/docs/homework-template',
    },
  ],
};

export const COURSE_WITHOUT_EXTRA_INFO: Course = {
  id: 2,
  slug: 'git-teamwork-1',
  name: 'Командная работа в Git',
  product_name: 'Командная работа в Git',
  tariff_name: null,
  home_page_slug: 'git-teamwork',
  cover: null,
  chat: null,
  calendar_ios: null,
  calendar_google: null,
  links: [],
};

// Text in parentheses is a tariff, the course cover hides it
export const COURSE_WITH_TARIFF_IN_NAME: Course = {
  id: 3,
  slug: 'sql-basics-2',
  name: 'Основы SQL (самостоятельный)',
  product_name: 'Основы SQL',
  tariff_name: 'Самостоятельный',
  home_page_slug: 'sql-basics',
  cover: null,
  chat: 'https://example.com/chat/sql-basics-2',
  calendar_ios: null,
  calendar_google: null,
  links: [],
};

export const COURSE_WITH_LONG_NAME: Course = {
  id: 4,
  slug: 'web-services-1',
  name: 'Разработка веб-сервисов: от первого эндпоинта до стабильной работы под нагрузкой',
  product_name: 'Разработка веб-сервисов',
  tariff_name: null,
  home_page_slug: 'web-services',
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

export const MODULE_RESOURCES: ModuleDetail = {
  id: 11,
  name: 'Ресурсы и эндпоинты',
  start_date: '2025-11-10T00:00:00Z',
  has_started: true,
  description:
    'Разбираем требования к сервису библиотеки и выделяем ресурсы API',
  text: '<p>В первом модуле мы спроектируем API сервиса выдачи книг для небольшой библиотеки. К концу недели у вас будет список ресурсов, эндпоинтов и ответов на ошибки.</p><p>Созвон в понедельник в 19:00 по Москве. Запись появится здесь через пару часов после окончания.</p>',
  lesson_count: 3,
  single_lesson_id: 0,
};

export const MODULE_ERRORS: ModuleDetail = {
  id: 12,
  name: 'Ошибки и коды ответов',
  start_date: '2025-11-24T00:00:00Z',
  has_started: true,
  description: 'Какие коды возвращать, как описывать ошибки и что видит клиент',
  text: '<p>Учимся отличать ошибки клиента от ошибок сервера и описывать их так, чтобы клиенту было понятно, что делать дальше.</p>',
  lesson_count: 2,
  single_lesson_id: 0,
};

export const MODULE_VERSIONING: ModuleDetail = {
  id: 13,
  name: 'Версионирование API',
  start_date: '2025-12-08T00:00:00Z',
  has_started: true,
  description:
    'Как менять API и не ломать клиентов, которые уже его используют',
  text: null,
  lesson_count: 2,
  single_lesson_id: 0,
};

export const MODULE_DOCUMENTATION: ModuleDetail = {
  id: 14,
  name: 'Документация',
  start_date: '2026-01-19T00:00:00Z',
  has_started: false,
  description: 'Описываем API в OpenAPI и собираем документацию для клиентов',
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
  MODULE_RESOURCES,
  MODULE_ERRORS,
  MODULE_VERSIONING,
  MODULE_DOCUMENTATION,
  MODULE_BONUS,
];

export const CALL: Call = {
  name: 'Вводный созвон: проектируем API библиотеки',
  description:
    'Знакомимся, разбираем требования к сервису и вместе выделяем первые ресурсы',
  url: 'https://example.com/call/rest-api-3-intro',
  datetime: '2025-11-10T16:00:00Z',
  video: [
    {
      provider: 'youtube',
      embed: 'https://example.com/video/rest-api-3-intro/youtube/embed',
      src: 'https://example.com/video/rest-api-3-intro/youtube',
    },
    {
      provider: 'rutube',
      embed: 'https://example.com/video/rest-api-3-intro/rutube/embed',
      src: 'https://example.com/video/rest-api-3-intro/rutube',
    },
  ],
  recommended_video_provider: RecommendedVideoProviderEnum.youtube,
};

export const UPCOMING_CALL: Call = {
  name: 'Вопросы и ответы по домашке',
  description: 'Отвечаем на вопросы, которые накопились за неделю',
  url: 'https://example.com/call/rest-api-3-qa',
  datetime: '2026-01-12T16:00:00Z',
  video: [],
  recommended_video_provider: null,
};

export const QUESTION: Question = {
  slug: 'library-api-resources',
  name: 'API сервиса выдачи книг',
  markdown_text: `Небольшая библиотека хочет, чтобы читатели бронировали книги через мобильное приложение. Вам нужно спроектировать API для этого приложения.

## Требования

1. Читатель видит каталог книг и может искать по названию и автору.
2. Читатель бронирует свободную книгу на три дня.
3. Библиотекарь отмечает, что книгу выдали или вернули.
4. Читатель видит свои брони и книги на руках.

## Что нужно сделать

- Выделите ресурсы и опишите их поля
- Перечислите эндпоинты с методами и кодами ответов
- Опишите, что вернёт API, если книгу уже забронировали

Пришлите ссылку на документ с решением и пару абзацев о том, какие решения вы приняли и почему.`,
  deadline: '2025-11-17T20:59:00Z',
};

export const QUESTION_ERRORS: Question = {
  slug: 'library-api-errors',
  name: 'Ошибки в API библиотеки',
  markdown_text: `Опишите ошибки, которые возвращает API из прошлой домашки.

- Какие ошибки вызывает клиент, а какие сервер
- Какой код ответа и какое тело у каждой ошибки
- Что увидит читатель, если сервис недоступен 15 минут`,
  deadline: '2025-12-01T20:59:00Z',
};

// The id matches the page in mockNotionMaterial
export const MATERIAL: NotionMaterial = {
  id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
  title: 'Как выделять ресурсы в REST API',
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
  question: QUESTION_ERRORS,
};

export const LESSONS: Lesson[] = [
  LESSON_CALL,
  LESSON_MATERIAL,
  LESSON_HOMEWORK,
];

export const BREADCRUMBS: Breadcrumbs = {
  course: LMS_COURSE,
  module: MODULE_RESOURCES,
  lesson: { id: LESSON_HOMEWORK.id },
};
