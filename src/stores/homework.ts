import { defineStore } from 'pinia';
import {
  getQuestion,
  postAnswer,
  deleteAnswer,
  updateAnswer,
  sendImage,
  getAnswers,
  getAnswer,
  addReaction,
  removeReaction,
} from '@/api/homework';
import type {
  Answer,
  Comment,
  Question,
  ReactionEmoji,
  Thread,
} from '@/types/homework';
import useToasts from '@/stores/toasts';
import getThreads from '@/utils/getThreads';

interface State {
  question: Question | undefined;
  answers: Answer[] | Thread[];
}

const useHomework = defineStore('homework', {
  state: (): State => {
    return {
      question: undefined,
      answers: [],
    };
  },
  actions: {
    appendAnswer(
      answer: Answer | Thread | Comment,
      answers?: Answer[] | Thread[] | Comment[],
    ) {
      if (!(answer as Comment).parent) {
        return this.answers.push(answer as Thread);
      }

      (answers || this.answers).forEach((item) => {
        if (!(item as Thread).descendants) {
          (item as Thread).descendants = [];
        }

        if (item.slug === (answer as Comment).parent) {
          return (item as Thread).descendants.push(answer as Comment);
        }

        if ((item as Thread).descendants.length > 0) {
          this.appendAnswer(answer, (item as Thread).descendants);
        }
      });
    },
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
          this.answers = await getThreads(answers);
        } else {
          this.answers = answers;
        }
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
        const answer = await postAnswer({ text, questionId, parentId });
        toasts.addMessage('Сообщение добавлено', 'success');
        this.appendAnswer(answer);
        return answer;
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
    async sendImage(file: File) {
      return await sendImage(file);
    },
    async addReaction({
      answerId,
      emoji,
      slug,
    }: {
      answerId: string;
      emoji: ReactionEmoji;
      slug?: string;
    }) {
      return await addReaction({ answerId, emoji, slug });
    },
    async removeReaction(answerId: string, reactionId: string) {
      return await removeReaction(answerId, reactionId);
    },
  },
});

export default useHomework;
