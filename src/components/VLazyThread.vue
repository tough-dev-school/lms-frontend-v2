<script lang="ts" setup>
  import type { Answer, Comment } from '@/types/homework';
  import VThread from '@/components/VThread.vue';
  import VPreloader from '@/components/VPreloader.vue';
  import { getComments } from '@/api/homework';
  import { ref, computed } from 'vue';

  export interface Props {
    originalPost: Answer;
  }

  const props = defineProps<Props>();
  const descendants = ref<Comment[]>([]);
  const isLoading = ref(false);

  const fetchComments = async () => {
    isLoading.value = true;
    const comments = (await getComments([props.originalPost.slug])).at(-1);
    descendants.value = comments ? comments.descendants : descendants.value;
    isLoading.value = false;
  };

  const unfoldLabel = [...Array(2)].map(() => 'Загрузить коментарии') as [
    string,
    string,
  ];

  const customActions = computed(() => [
    {
      name: 'Загрузить коментарии',
      handle: fetchComments,
      show: descendants.value.length === 0,
      label: unfoldLabel,
    },
  ]);
</script>

<template>
  <VThread
    :originalPost="{ ...originalPost, descendants }"
    :customActions="customActions"
    @update="fetchComments" />
  <div v-if="isLoading" class="relative h-256">
    <VPreloader class="absolute" />
  </div>
</template>
