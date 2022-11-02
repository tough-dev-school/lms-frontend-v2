import { defineStore } from 'pinia';
import { getQuestion, getAnswers, postAnswer } from '@/api/homework';
import type { Answer, Question, Post } from '@/types/homework';

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
    async getAnswers(id: string) {
      try {
        this.answer = await getAnswers(id);
      } catch (error: any) {}
    },
    async postAnswer({ text, parent, question }: Post) {
      try {
        await postAnswer({ text, parent, question });
      } catch (error: any) {}
    },
  },
});

export default useHomework;
