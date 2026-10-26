import type { Ref } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import {
  homeworkAnswersRetrieveQueryKey,
  useHomeworkAnswersAttachmentCreate,
} from '@/api/generated';

// Attachments need an existing answer slug, so they are uploaded after the answer is saved
export const useAnswerAttachmentsUpload = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } =
    useHomeworkAnswersAttachmentCreate();

  const upload = async (answerSlug: string, files: Ref<File[]>) => {
    if (files.value.length === 0) return;

    // Sequential so attachments keep the order the user picked them in.
    // Uploaded files leave the list right away, so a retry after a failure does not duplicate them
    try {
      while (files.value.length > 0) {
        const [file] = files.value;
        await mutateAsync({ answer_slug: answerSlug, data: { file } });
        files.value = files.value.slice(1);
      }
    } finally {
      // Refetch even after a failure to show the files that did upload
      await queryClient.invalidateQueries({
        queryKey: homeworkAnswersRetrieveQueryKey(answerSlug),
      });
    }
  };

  return { upload, isPending, error };
};
