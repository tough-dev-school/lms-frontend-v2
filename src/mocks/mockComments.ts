import type { Comments, Comment, Thread } from '@/types/homework';

export const getCommentsData = (parent: Thread | Comment): Comments => ({
  slug: parent.slug,
  descendants: [],
});
