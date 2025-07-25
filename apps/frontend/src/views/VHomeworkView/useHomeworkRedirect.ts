import { ref, watch, onBeforeMount  } from 'vue';
import type {Ref} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import { fetchUser, fetchHomeworkAnswer, fetchHomeworkAnswers } from '@/query';

export function useHomeworkRedirect(
  questionId: Ref<string>,
  answerId: Ref<string | undefined>,
) {
  const router = useRouter();
  const route = useRoute();
  const queryClient = useQueryClient();
  const isRedirecting = ref(false);

  const handleHomeworkLogic = async () => {
    isRedirecting.value = true;

    try {
      const user = await fetchUser(queryClient);

      if (answerId.value) {
        try {
          await fetchHomeworkAnswer(queryClient, {
            answerId: answerId.value,
          });
        } catch {
          await router.replace({
            ...route,
            query: { ...route.query, answerId: undefined },
          });
        }
      } else {
        const answers = await fetchHomeworkAnswers(queryClient, {
          questionId: questionId.value,
          authorId: user.uuid,
        });

        if (answers && answers.length > 0) {
          await router.replace({
            ...route,
            query: {
              ...route.query,
              answerId: answers[0]?.slug,
            },
          });
        }
      }
    } finally {
      isRedirecting.value = false;
    }
  };

  onBeforeMount(handleHomeworkLogic);
  watch([questionId, answerId], handleHomeworkLogic);

  return {
    isRedirecting,
  };
}
