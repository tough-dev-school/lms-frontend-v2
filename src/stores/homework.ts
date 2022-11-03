import { defineStore } from 'pinia';
import { getQuestion, getAnswer, postAnswer } from '@/api/homework';
import type { Answer, Question } from '@/types/homework';

interface State {
  question: Question | undefined;
  answer: Answer | undefined;
}

const useHomework = defineStore('homework', {
  state: (): State => {
    return {
      question: undefined,
      answer: undefined,
    };
  },
  actions: {
    async getQuestion(id: string) {
      try {
        this.question = await getQuestion(id);
      } catch (error: any) {}
    },
    async getAnswer(id: string) {
      try {
        this.answer = await getAnswer(id);
      } catch (error: any) {}
    },
    async postQuestionAnswer(text: string, questionId: string) {
      try {
        await postAnswer(text, questionId, null);
      } catch (error: any) {}
    },
  },
});

export default useHomework;
