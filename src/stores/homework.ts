import { defineStore } from 'pinia';
import {
  getQuestion,
  postAnswer,
  deleteAnswer,
  updateAnswer,
  getAnswers,
  getAnswer,
} from '@/api/homework';
import type { Answer, Question } from '@/types/homework';
import useToasts from '@/stores/toasts';

interface State {
  question: Question | undefined;
  answers: Answer[];
}

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
    }: {
      questionId?: string;
      authorId?: string;
    }) {
      try {
        this.answers = await getAnswers({
          questionId,
          authorId,
        });
      } catch (error: any) {}
    },
    async getAnswerById(answerId: string) {
      try {
        const answer = await getAnswer(answerId);
        this.answers = [answer];
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
