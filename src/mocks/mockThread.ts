import type { Thread } from '@/types/homework';
import { mockAnswer } from './mockAnswer';

export const mockThread = (payload: Partial<Thread> = {}): Thread => ({
  ...mockAnswer(),
  descendants: [],
  ...payload,
});
