import type { Answer, Question, ReactionEmoji, Thread } from '@/types/homework';

import {
  addReaction,
  deleteAnswer,
  getAnswer,
  getAnswers,
  getQuestion,
  postAnswer,
  removeReaction,
  sendImage,
  updateAnswer,
} from '@/api/homework';
import useToasts from '@/stores/toasts';
import getThreads from '@/utils/getThreads';
import { defineStore } from 'pinia';

interface State {
  answers: Answer[] | Thread[];
  question: Question | undefined;
}

const useHomework = defineStore('homework', {
  actions: {
    async addReaction(answerId: string, reaction: ReactionEmoji) {
      return await addReaction(answerId, reaction);
    },
    async deleteAnswer(answerId: string) {
      const toasts = useToasts();
      try {
        await deleteAnswer(answerId);
        toasts.addMessage('Сообщение удалено', 'success');
      } catch (error: any) {}
    },
    async getAnswerById(answerId: string, threads = false) {
      try {
        const answer = await getAnswer(answerId);

        if (threads) {
          this.answers = await getThreads([answer]);
        } else {
          this.answers = [answer];
        }
      } catch (error: any) {}
    },
    async getAnswers({
      authorId,
      questionId,
      threads,
    }: {
      authorId?: string;
      questionId?: string;
      threads?: boolean;
    }) {
      try {
        const answers = await getAnswers({
          authorId,
          questionId,
        });

        if (threads) {
          this.answers = await getThreads(answers);
        } else {
          this.answers = answers;
        }
      } catch (error: any) {}
    },
    async getQuestion(questionId: string) {
      try {
        this.question = await getQuestion(questionId);
      } catch (error: any) {}
    },
    async postAnswer({
      parentId,
      questionId,
      text,
    }: {
      parentId?: string;
      questionId: string;
      text: string;
    }) {
      const toasts = useToasts();
      try {
        const answer = await postAnswer({ parentId, questionId, text });
        toasts.addMessage('Сообщение добавлено', 'success');
        return answer;
      } catch (error: any) {}
    },
    async removeReaction(answerId: string, reactionId: string) {
      return await removeReaction(answerId, reactionId);
    },
    async sendImage(file: File) {
      return await sendImage(file);
    },
    async updateAnswer(answerId: string, text: string) {
      const toasts = useToasts();
      try {
        await updateAnswer(answerId, text);
        toasts.addMessage('Сообщение отправлено', 'success');
      } catch (error: any) {}
    },
  },
  state: (): State => {
    return {
      answers: [],
      question: undefined,
    };
  },
});

export default useHomework;
