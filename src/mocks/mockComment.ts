import type { Comment, Thread } from '@/types/homework';

import { mockAnswer } from './mockAnswer';
import { mockThread } from './mockThread';

export const mockComment = (
  payload: Partial<Comment | Thread> &
    Pick<Comment | Thread, 'question' | 'slug'>,
): Comment => {
  const parent = payload.slug;
  const question = payload.question;

  return {
    ...mockThread(mockAnswer({ question })),
    parent,
    ...payload,
  };
};
