import type { Thread, Comment } from '@/types/homework';
import { mockAnswer } from './mockAnswer';
import { mockThread } from './mockThread';

export const mockComment = (
  payload: Partial<Thread | Comment> &
    Pick<Thread | Comment, 'slug' | 'question'>,
): Comment => {
  const parent = payload.slug;
  const question = payload.question;

  return {
    ...mockThread(mockAnswer({ question })),
    parent,
    ...payload,
  };
};
