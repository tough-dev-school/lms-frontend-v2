import type { Thread, Comment } from '@/types/homework';
import { mockAnswer } from './mockAnswer';
import { mockThread } from './mockThread';

export const getCommentData = (parent: Thread | Comment): Comment => {
  return {
    ...mockThread(mockAnswer({ question: parent.question })),
    parent: parent.slug,
  };
};
