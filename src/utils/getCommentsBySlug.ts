import type { Comments } from '@/types/homework';

const getCommentsBySlug = (commentsData: Comments[], slug: string) => {
  const comments = commentsData.find((comments) => comments.slug === slug);
  return comments ? comments.descendants : [];
};

export default getCommentsBySlug;
