<script lang="ts" setup>
  import type { Answer, Comment } from '@/types/homework';
  import { VThread } from '@/components/VThread';
  import { VPreloader } from '@/components/VPreloader';
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

  const customActions = computed(() => [
    {
      name: 'Загрузить комментарии',
      handle: fetchComments,
      show: props.originalPost.hasDescendants && descendants.value.length === 0,
    },
    {
      name: 'Комментариев нет',
      handle: null,
      show: !props.originalPost.hasDescendants,
    },
  ]);
</script>

<template>
  <VThread
    :originalPost="{ ...originalPost, descendants }"
    :customActions="customActions"
    @update="fetchComments"
    @reply="fetchComments" />
  <div v-if="isLoading" class="relative h-256">
    <VPreloader class="absolute" />
  </div>
</template>
