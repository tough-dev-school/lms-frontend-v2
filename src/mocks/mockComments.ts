import type { Comment, Comments, Thread } from '@/types/homework';

export const mockComments = (payload: Comment[]): Comments => {
  const slug = payload[0].parent;

  return {
    descendants: [...payload],
    slug,
  };
};
