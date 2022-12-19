<script lang="ts" setup>
  import type { Answer } from '@/types/homework';
  import VThread from '@/components/VThread.vue';
  import VPreloader from '@/components/VPreloader.vue';
  import { getComments } from '@/api/homework';
  import { ref, watch } from 'vue';

  export interface Props {
    originalPost: Answer;
  }

  const props = defineProps<Props>();

  const descendants = ref([]);

  const replyMode = ref(false);

  const isLoading = ref(false);

  const fetchComments = async () => {
    isLoading.value = true;
    descendants.value = (await getComments([props.originalPost.slug])).at(
      -1,
    ).descendants;
    isLoading.value = false;
  };

  watch(replyMode, async (value) => {
    if (value) await fetchComments();
    else {
      descendants.value = [];
    }
  });
</script>

<template>
  <VThread
    :originalPost="{ ...originalPost, descendants }"
    @reply="(value) => (replyMode = value)"
    :unfoldLabel="['Закрыть комментарии', 'Открыть комментарии']" />
  <div v-if="isLoading" class="relative h-256">
    <VPreloader class="absolute" />
  </div>
</template>
