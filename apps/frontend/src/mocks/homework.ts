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

export const SOLUTION_HTML = `<p>Доска с Event Storming: <a href="https://miro.com/app/board/uXjVN-anna-popug/">miro.com/app/board/uXjVN-anna-popug</a></p>
<p><strong>Акторы:</strong> попуг-исполнитель, менеджер, администратор.</p>
<p><strong>Команды и события:</strong></p>
<ol>
<li><p>Создать задачу → <code>TaskCreated</code></p></li>
<li><p>Заассайнить задачи → <code>TasksShuffled</code>, по одному <code>TaskAssigned</code> на каждую задачу</p></li>
<li><p>Отметить задачу выполненной → <code>TaskCompleted</code></p></li>
</ol>
<p>Сервисов получилось два: таск-трекер и авторизация. Аккаунтинг пока не выделяла, в требованиях этого модуля его нет. Сомневаюсь, нужен ли отдельный <code>TasksShuffled</code>, если всё равно летят <code>TaskAssigned</code>. Оставила, чтобы аналитика видела факт нажатия кнопки.</p>`;

const MENTOR_REVIEW_HTML = `<p>Хорошая модель, границы сервисов получились аккуратными.</p>
<p>Про <code>TasksShuffled</code>: событие полезное, но подумайте, кто его консьюмер. Если только аналитика, это нормально. Просто явно подпишите это на доске, чтобы через полгода никто не гадал.</p>`;

const REPLY_STUDENT = createAnswerFixture({
  slug: 'c8f2d3e5-6a7b-4c9d-0e1f-2a3b4c5d6e7f',
  author: STUDENT_SAFE,
  parent: 'b7e1c2d4-5f6a-4b8c-9d0e-1f2a3b4c5d6e',
  created: '2025-11-18T11:40:00Z',
  html: '<p>Спасибо! Добавила на доску стикер с консьюмерами для каждого события.</p>',
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
  html: `<p>Мне нравится, что ты не стала сразу выделять аккаунтинг. Я выделил и теперь не понимаю, что в нём делать до третьего модуля 😅</p>
<p>Вопрос: а кто публикует <code>TaskAssigned</code>, таск-трекер или отдельный сервис распределения?</p>`,
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
  html: `<p>Классно, что ты сразу подумал про идемпотентность <code>TaskCompleted</code>. Я до этого не дошла.</p>
<p>Одно замечание: на доске <code>TaskAssigned</code> публикует сервис авторизации. Кажется, это ответственность таск-трекера, авторизация не знает про задачи.</p>`,
  isEditable: true,
});

export const CLASSMATE_ANSWER = createAnswerFixture({
  slug: 'e0b4f5a7-8c9d-4e1f-2a3b-4c5d6e7f8091',
  author: CLASSMATE_1,
  created: '2025-11-17T08:15:00Z',
  html: `<p>Решение: <a href="https://excalidraw.com/#room=popug-dmitry">excalidraw.com/#room=popug-dmitry</a></p>
<p>Выделил три сервиса: таск-трекер, авторизацию и аккаунтинг. События между ними гоняю через Kafka.</p>
<blockquote><p>Самое сложное было понять, что считать агрегатом. В итоге агрегат один, задача.</p></blockquote>
<p><code>TaskCompleted</code> сделал идемпотентным: попуг может нажать кнопку дважды, деньги должны начислиться один раз.</p>`,
  reactions: [
    [ReactionEmoji.ROCKET, STUDENT_SAFE],
    [ReactionEmoji.LIKE, CLASSMATE_2],
    [ReactionEmoji.LIKE, ANONYMOUS_CLASSMATE],
  ],
  descendants: [CLASSMATE_REPLY_FROM_STUDENT],
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
  html: '<p>Сделал по шаблону с созвона, вопросов нет. Доска: <a href="https://miro.com/app/board/uXjVN-hedgehog/">miro.com/app/board/uXjVN-hedgehog</a></p>',
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
  legacy_text: `<p><strong>Первая домашка</strong></p>
<ol>
<li>Нет проблем с общением не равно нет проблем с эмпатией. То, что ты понимаешь эмоции другого человека, это твоя большая сила.</li>
<li>Назвать большой срок или больше денег тоже часть общения. Подумай, что случится, если ты назовёшь большой срок. Человек расстроится, подумает о тебе плохо? Попробуй сделать ABC-анализ, он поможет поработать с автоматическими мыслями.</li>
<li>Классно, что ты решил брать таймаут на оценку, а не соглашаться сходу.</li>
</ol>
<p><strong>Вторая домашка</strong></p>
<p>Твоё решение рабочее, но это позиция родителя, который защищает команду и не даёт ей самой отвечать за свои ошибки. Подумай, кто из ребят мог бы стать твоей правой рукой.</p>
<p>Марьяна</p>`,
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
