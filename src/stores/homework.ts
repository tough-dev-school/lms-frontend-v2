import { defineStore } from 'pinia';
import {
  getQuestion,
  getAnswer,
  postAnswer,
  deleteAnswer,
  updateAnswer,
  getAnswers,
} from '@/api/homework';
import type { Answer, Question } from '@/types/homework';
import useUser from '@/stores/user';

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
    async getQuestion(questionId: string) {
      try {
        this.question = await getQuestion(questionId);
      } catch (error: any) {}
    },
    async getAnswer(answerId: string) {
      try {
        this.answer = await getAnswer(answerId);
      } catch (error: any) {}
    },
    async findAnswer(questionId: string, authorId: string) {
      const answers = await getAnswers({
        questionId,
        authorId,
      });

      const lastAnswer = answers.results.at(-1);

      let answerId = lastAnswer ? lastAnswer.slug : lastAnswer;

      if (answerId) {
        await this.getAnswer(answerId);
      }
    },
    async postAnswer(text: string, questionId: string) {
      try {
        await postAnswer(text, questionId, null);

        const user = useUser();
        const authorId = user.uuid;
        await this.findAnswer(questionId, authorId);
      } catch (error: any) {}
    },
    async deleteAnswer(answerId: string) {
      try {
        await deleteAnswer(answerId);
        this.answer = undefined;
      } catch (error: any) {}
    },
    async updateAnswer(answerId: string, text: string) {
      try {
        await updateAnswer(answerId, text);
        await this.getAnswer(answerId);
      } catch (error: any) {}
    },
  },
});

export default useHomework;
