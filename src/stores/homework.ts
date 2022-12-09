import { defineStore } from 'pinia';
import {
  getQuestion,
  postAnswer,
  deleteAnswer,
  updateAnswer,
  getAnswers,
  getAnswer,
  getComments,
} from '@/api/homework';
import type { Answer, Comments, Question, Thread } from '@/types/homework';
import useToasts from '@/stores/toasts';

interface State {
  question: Question | undefined;
  answers: Answer[] | Thread[];
}

const getCommentsBySlug = (commentsData: Comments[], slug: string) => {
  const comments = commentsData.find((comments) => comments.slug === slug);
  return comments ? comments.descendants : [];
};

const useHomework = defineStore('homework', {
  state: (): State => {
    return {
      question: undefined,
      answers: [],
    };
  },
  actions: {
    async getQuestion(questionId: string) {
      try {
        this.question = await getQuestion(questionId);
      } catch (error: any) {}
    },
    async getAnswers({
      questionId,
      authorId,
      threads,
    }: {
      questionId?: string;
      authorId?: string;
      threads?: boolean;
    }) {
      try {
        const answers = await getAnswers({
          questionId,
          authorId,
        });

        if (threads) {
          const answerIds = answers.map((answer) => answer.slug);
          const commentsData = await getComments(answerIds);
          const threads = answers.map((answer) => {
            return {
              ...answer,
              descendants: getCommentsBySlug(commentsData, answer.slug),
            };
          });

          this.answers = threads;
        } else {
          this.answers = answers;
        }
      } catch (error: any) {}
    },
    async getAnswerById(answerId: string, threads: boolean = false) {
      try {
        const answer = await getAnswer(answerId);

        if (threads) {
          const commentsData = await getComments([answer.slug]);

          const thread: Thread = {
            ...answer,
            descendants: getCommentsBySlug(commentsData, answer.slug),
          };

          this.answers = [thread];
        } else {
          this.answers = [answer];
        }
      } catch (error: any) {}
    },
    async postAnswer({
      text,
      questionId,
      parentId,
    }: {
      text: string;
      questionId: string;
      parentId?: string;
    }) {
      const toasts = useToasts();
      try {
        await postAnswer({ text, questionId, parentId });
        toasts.addMessage('Сообщение добавлено', 'success');
      } catch (error: any) {}
    },
    async deleteAnswer(answerId: string) {
      const toasts = useToasts();
      try {
        await deleteAnswer(answerId);
        toasts.addMessage('Сообщение удалено', 'success');
      } catch (error: any) {}
    },
    async updateAnswer(answerId: string, text: string) {
      const toasts = useToasts();
      try {
        await updateAnswer(answerId, text);
        toasts.addMessage('Сообщение отправлено', 'success');
      } catch (error: any) {}
    },
  },
});

export default useHomework;
