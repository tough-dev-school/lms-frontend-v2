import type { Answer, Thread } from '@/types/homework';
import { mockAnswer } from './mockAnswer';

export const mockThread = (answer: Answer = mockAnswer()): Thread => ({
  ...answer,
  descendants: [],
});
