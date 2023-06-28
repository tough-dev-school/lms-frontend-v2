import type { Comments, Comment, Thread } from '@/types/homework';

export const mockComments = (
  payload: Partial<Thread | Comment> & Pick<Thread | Comment, 'slug'>,
): Comments => {
  return {
    descendants: [],
    ...payload,
  };
};
