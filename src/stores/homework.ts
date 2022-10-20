import { defineStore } from 'pinia';
import { getQuestion, getAnswers } from '@/api/homework';
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
    async getData(id: string) {
      try {
        this.answer = await getAnswers(id);
        this.question = await getQuestion(this.answer.question);
      } catch (error: any) {}
    },
  },
});

export default useHomework;
