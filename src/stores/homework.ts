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
      questionId: string;
      authorId: string;
    }) {
      try {
        this.answers = (
          await getAnswers({
            questionId,
            authorId,
          })
        ).results;
      } catch (error: any) {}
    },
    async getAnswerById(answerId: string) {
      try {
        const answer = await getAnswer(answerId);
        this.answers = [answer];
      } catch (error: any) {}
    },
    async postAnswer(text: string, questionId: string) {
      try {
        await postAnswer(text, questionId, null);
      } catch (error: any) {}
    },
    async deleteAnswer(answerId: string) {
      try {
        await deleteAnswer(answerId);
      } catch (error: any) {}
    },
    async updateAnswer(answerId: string, text: string) {
      try {
        await updateAnswer(answerId, text);
      } catch (error: any) {}
    },
  },
});

export default useHomework;
