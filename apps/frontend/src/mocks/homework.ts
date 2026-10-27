import { generateJSON } from '@tiptap/vue-3';
import { getExtensions } from '@/utils/tiptap';
import { ReactionEmoji } from '@/components/VReactions/VReactions.vue';
import type {
  AnswerTree,
  CrossCheck,
  QuestionDetail,
  ReactionDetailed,
  UserSafe,
} from '@/api/generated';
import {
  BREADCRUMBS,
  LESSON_HOMEWORK,
  LMS_COURSE,
  QUESTION,
} from '@/mocks/courses';
import {
  ANONYMOUS_CLASSMATE,
  CLASSMATE_1,
  CLASSMATE_2,
  CLASSMATE_3,
  MENTOR,
  STUDENT_SAFE,
} from '@/mocks/users';

// Answers are stored as TipTap JSON, HTML is easier to read and edit in fixtures
export const htmlToContent = (html: string) =>
  generateJSON(html, getExtensions({ placeholder: '' }));

export const QUESTION_DETAIL: QuestionDetail = {
  ...QUESTION,
  homework: LESSON_HOMEWORK.homework,
  breadcrumbs: BREADCRUMBS,
  course: LMS_COURSE,
};

export const QUESTION_DETAIL_NOT_SENT: QuestionDetail = {
  ...QUESTION_DETAIL,
  homework: { is_sent: false },
};

let reactionIndex = 0;

export const createReactions = (
  answer: string,
  reactions: [ReactionEmoji, UserSafe][],
): ReactionDetailed[] =>
  reactions.map(([emoji, author]) => ({
    slug: `reaction-${answer}-${++reactionIndex}`,
    emoji,
    author,
    answer,
  }));

interface AnswerFixture {
  slug: string;
  author: UserSafe;
  html: string;
  created: string;
  parent?: string;
  reactions?: [ReactionEmoji, UserSafe][];
  descendants?: AnswerTree[];
  isEditable?: boolean;
}

export const createAnswerFixture = ({
  slug,
  author,
  html,
  created,
  parent = '',
  reactions = [],
  descendants = [],
  isEditable = false,
}: AnswerFixture): AnswerTree => ({
  slug,
  author,
  created,
  modified: created,
  question: QUESTION.slug,
  parent,
  legacy_text: '',
  content: htmlToContent(html),
  has_descendants: descendants.length > 0,
  is_editable: isEditable,
  reactions: createReactions(slug, reactions),
  descendants,
});

export const SOLUTION_HTML = `<p>Решение: <a href="https://example.com/docs/anna-library-api">example.com/docs/anna-library-api</a></p>
<p><strong>Ресурсы:</strong> книга, бронь, выдача.</p>
<p><strong>Эндпоинты:</strong></p>
<ol>
<li><p>Найти книги → <code>GET /books?query=</code></p></li>
<li><p>Забронировать книгу → <code>POST /reservations</code>, в ответ <code>201</code> или <code>409</code>, если бронь уже есть</p></li>
<li><p>Выдать или вернуть книгу → <code>POST /loans</code> и <code>POST /loans/{id}/return</code></p></li>
</ol>
<p>Бронь и выдачу сделала отдельными ресурсами: бронь может истечь, а выдача нет. Сомневаюсь, нужен ли отдельный ресурс для возврата или хватит <code>PATCH /loans/{id}</code>. Оставила действие, чтобы в истории было видно, кто принял книгу.</p>`;

const MENTOR_REVIEW_HTML = `<p>Хорошее решение, ресурсы выделены аккуратно.</p>
<p>Про возврат: действие через <code>POST</code> подходит, если у возврата есть своя логика. Если это только смена статуса, <code>PATCH</code> проще. Опишите в документе, почему выбрали действие, чтобы через полгода никто не гадал.</p>`;

const REPLY_STUDENT = createAnswerFixture({
  slug: 'c8f2d3e5-6a7b-4c9d-0e1f-2a3b4c5d6e7f',
  author: STUDENT_SAFE,
  parent: 'b7e1c2d4-5f6a-4b8c-9d0e-1f2a3b4c5d6e',
  created: '2025-11-18T11:40:00Z',
  html: '<p>Спасибо! Добавила в документ раздел про возврат.</p>',
  isEditable: true,
});

const REPLY_MENTOR = createAnswerFixture({
  slug: 'b7e1c2d4-5f6a-4b8c-9d0e-1f2a3b4c5d6e',
  author: MENTOR,
  parent: 'a1f9e3c7-2b4d-4e6f-8a0b-c2d4e6f8a0b1',
  created: '2025-11-18T09:12:00Z',
  html: MENTOR_REVIEW_HTML,
  reactions: [
    [ReactionEmoji.LIKE, STUDENT_SAFE],
    [ReactionEmoji.LIKE, CLASSMATE_2],
  ],
  descendants: [REPLY_STUDENT],
});

const REPLY_CLASSMATE = createAnswerFixture({
  slug: 'd9a3e4f6-7b8c-4d0e-1f2a-3b4c5d6e7f80',
  author: CLASSMATE_1,
  parent: 'a1f9e3c7-2b4d-4e6f-8a0b-c2d4e6f8a0b1',
  created: '2025-11-19T18:05:00Z',
  html: `<p>Мне нравится, что бронь и выдача у тебя разные ресурсы. У меня это один ресурс с пятью статусами, и я уже запутался 😅</p>
<p>Вопрос: а кто снимает просроченную бронь, сервер по расписанию или она просто считается недействительной при запросе?</p>`,
  reactions: [[ReactionEmoji.HAPPY, CLASSMATE_3]],
});

export const STUDENT_ANSWER = createAnswerFixture({
  slug: 'a1f9e3c7-2b4d-4e6f-8a0b-c2d4e6f8a0b1',
  author: STUDENT_SAFE,
  created: '2025-11-16T19:47:00Z',
  html: SOLUTION_HTML,
  isEditable: true,
  reactions: [
    [ReactionEmoji.FIRE, CLASSMATE_1],
    [ReactionEmoji.FIRE, MENTOR],
    [ReactionEmoji.LIKE, CLASSMATE_2],
    [ReactionEmoji.SEEN, CLASSMATE_3],
  ],
  descendants: [REPLY_MENTOR, REPLY_CLASSMATE],
});

export const STUDENT_ANSWER_WITHOUT_REPLIES: AnswerTree = {
  ...STUDENT_ANSWER,
  has_descendants: false,
  descendants: [],
};

const CLASSMATE_REPLY_FROM_STUDENT = createAnswerFixture({
  slug: 'f1c5a6b8-9d0e-4f2a-3b4c-5d6e7f8091a2',
  author: STUDENT_SAFE,
  parent: 'e0b4f5a7-8c9d-4e1f-2a3b-4c5d6e7f8091',
  created: '2025-11-19T10:20:00Z',
  html: `<p>Классно, что ты сразу подумал про повторную бронь. Я до этого не дошла.</p>
<p>Одно замечание: <code>DELETE /books/{id}/reservation</code> отменяет чужую бронь, если знать id книги. Кажется, отменять нужно по id брони и проверять читателя.</p>`,
  isEditable: true,
});

const CLASSMATE_REPLY_FROM_MENTOR = createAnswerFixture({
  slug: '4d8f9a1b-2c3d-4e5f-7a8b-9c0d1e2f3a41',
  author: MENTOR,
  parent: 'e0b4f5a7-8c9d-4e1f-2a3b-4c5d6e7f8091',
  created: '2025-11-18T14:30:00Z',
  html: `<p>409 для гонки за последнюю книгу хороший выбор. Добавьте в тело ошибки id брони, которая победила, клиенту будет проще показать понятное сообщение.</p>`,
  reactions: [[ReactionEmoji.LIKE, CLASSMATE_1]],
});

export const CLASSMATE_ANSWER = createAnswerFixture({
  slug: 'e0b4f5a7-8c9d-4e1f-2a3b-4c5d6e7f8091',
  author: CLASSMATE_1,
  created: '2025-11-17T08:15:00Z',
  html: `<p>Решение: <a href="https://example.com/docs/dmitry-library-api">example.com/docs/dmitry-library-api</a></p>
<p>Сделал два ресурса: книги и брони. Выдачу храню как статус брони.</p>
<blockquote><p>Самое сложное было решить, что вернуть, если книгу забронировали секундой раньше. Выбрал 409 с текстом ошибки.</p></blockquote>
<p>Повторная бронь той же книги тем же читателем возвращает существующую бронь, а не ошибку.</p>`,
  reactions: [
    [ReactionEmoji.ROCKET, STUDENT_SAFE],
    [ReactionEmoji.LIKE, CLASSMATE_2],
    [ReactionEmoji.LIKE, ANONYMOUS_CLASSMATE],
  ],
  descendants: [CLASSMATE_REPLY_FROM_MENTOR, CLASSMATE_REPLY_FROM_STUDENT],
});

export const MENTOR_ANSWER = createAnswerFixture({
  slug: '2b6d7e9f-0a1b-4c3d-5e6f-7a8b9c0d1e2f',
  author: MENTOR,
  created: '2025-11-18T09:12:00Z',
  html: MENTOR_REVIEW_HTML,
});

export const ANONYMOUS_ANSWER = createAnswerFixture({
  slug: '3c7e8f0a-1b2c-4d4e-6f7a-8b9c0d1e2f30',
  author: ANONYMOUS_CLASSMATE,
  created: '2025-11-17T22:31:00Z',
  html: '<p>Сделал по шаблону с созвона, вопросов нет. Документ: <a href="https://example.com/docs/hedgehog-library-api">example.com/docs/hedgehog-library-api</a></p>',
});

// A long review with sections, a list of long items and a signature, to check how big answers wrap
export const LONG_REVIEW_HTML = `<p><strong>Первая часть домашки</strong></p>
<ol>
<li><p>Книга и экземпляр книги это разные вещи. В библиотеке может стоять пять экземпляров одной книги, и бронирует читатель всегда конкретный экземпляр. Если смешать их в одном ресурсе, придётся хранить счётчики свободных копий и следить, чтобы два читателя не забрали последнюю одновременно.</p></li>
<li><p>Поиск лучше сделать параметрами списка, а не отдельным эндпоинтом. <code>GET /books?query=</code> кешируется так же, как обычный список, а клиенту не нужно помнить, какой адрес для чего. Отдельный эндпоинт оправдан, только если у поиска своя модель ответа, например с подсветкой совпадений.</p></li>
<li><p>Хорошо, что у брони есть срок. Подумай, как клиент узнает, что срок истёк. Если сервер снимает просроченные брони раз в час, читатель может час видеть бронь, которой уже нет, и прийти за книгой зря. Возможно, стоит считать бронь недействительной в момент запроса.</p></li>
<li><p>То, что ты переживаешь за обратную совместимость, это нормально. Главное, что ты можешь договориться с командой мобильного приложения о том, как вы будете выпускать изменения. Например, новые поля добавлять сразу, а старые убирать только через версию, когда все пользователи обновятся.</p></li>
</ol>
<p><strong>Вторая часть домашки</strong></p>
<p>Решение рабочее, и я понимаю, почему все ошибки возвращают 400: так быстрее написать сервер. Но клиенту так не понять, что исправить. Читатель увидит одно и то же сообщение, если он опечатался в запросе и если книгу просто забрали раньше него.</p>
<p>Было бы правильно разделить ошибки клиента и ошибки состояния. На ошибку в запросе отвечай 400 с указанием поля, на занятую книгу 409 с датой, когда она освободится, на чужую бронь 403. Покрути эту тему в голове и представь, что ты пишешь мобильное приложение и видишь только код и тело ответа. Что тебе нужно, чтобы показать читателю понятное сообщение?</p>
<p>Тебе будет полезен третий урок про ошибки и пример из репозитория курса. Добавь их себе в закладки и приходи с вопросами на созвон.</p>
<p>P. S. Твой комментарий про пагинацию справедлив, мы специально не стали усложнять задание.</p>
<p>Ольга</p>`;

export const LONG_REVIEW_ANSWER = createAnswerFixture({
  slug: '5e9a0b2c-3d4e-4f60-8a9b-0c1d2e3f4152',
  author: STUDENT_SAFE,
  created: '2025-11-18T15:30:00Z',
  html: LONG_REVIEW_HTML,
  isEditable: true,
});

// Answers sent before the switch to TipTap only have HTML in legacy_text
export const LEGACY_ANSWER: AnswerTree = {
  ...createAnswerFixture({
    slug: '4d8f9a1b-2c3d-4e5f-7a8b-9c0d1e2f3041',
    author: CLASSMATE_2,
    created: '2023-03-14T12:00:00Z',
    html: '',
  }),
  content: {},
  legacy_text: LONG_REVIEW_HTML,
};

const crossCheck = (
  id: number,
  author: UserSafe,
  slug: string,
  isChecked: boolean,
): CrossCheck => ({
  id,
  is_checked: isChecked,
  answer: {
    slug,
    url: `/homework/${QUESTION.slug}?answerId=${slug}`,
    question: QUESTION,
    author,
  },
});

export const CROSSCHECKS: CrossCheck[] = [
  crossCheck(1, CLASSMATE_1, CLASSMATE_ANSWER.slug, true),
  crossCheck(2, CLASSMATE_2, '6f0a1b3c-4d5e-4f6a-8b9c-0d1e2f304152', true),
  crossCheck(3, ANONYMOUS_CLASSMATE, ANONYMOUS_ANSWER.slug, false),
];
