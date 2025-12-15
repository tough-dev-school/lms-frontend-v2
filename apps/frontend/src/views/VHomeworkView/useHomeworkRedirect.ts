import { ref, watch, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import {
  usersMeRetrieveQueryOptions,
  homeworkAnswersRetrieveQueryOptions,
  homeworkAnswersListQueryOptions,
} from '@/api/generated';

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
      const user = await queryClient.fetchQuery(usersMeRetrieveQueryOptions());

      if (answerId.value) {
        try {
          await queryClient.fetchQuery(
            homeworkAnswersRetrieveQueryOptions(answerId.value),
          );
        } catch {
          await router.replace({
            ...route,
            query: { ...route.query, answerId: undefined },
          });
        }
      } else {
        const answersData = await queryClient.fetchQuery(
          homeworkAnswersListQueryOptions({
            question: questionId.value,
            author: user.uuid,
          }),
        );

        if (answersData && answersData.results.length > 0) {
          await router.replace({
            ...route,
            query: {
              ...route.query,
              answerId: answersData.results[0]?.slug,
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
