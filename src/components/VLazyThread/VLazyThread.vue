<script lang="ts" setup>
  import type { Answer, Comment } from '@/types/homework';
  import { VThread, type ThreadAction } from '@/components/VThread';
  import VPreloader from '@/components/VPreloader/VPreloader.vue';
  import { getComments } from '@/api/homework';
  import { ref, computed } from 'vue';
  import { MessagesIcon, MessagesOffIcon } from 'vue-tabler-icons';

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

  const customActions = computed<ThreadAction[]>(() => [
    {
      name: 'Загрузить комментарии',
      handle: fetchComments,
      show: props.originalPost.hasDescendants && descendants.value.length === 0,
      icon: MessagesIcon,
    },
    {
      name: 'Комментариев нет',
      handle: null,
      show: !props.originalPost.hasDescendants,
      disabled: true,
      icon: MessagesOffIcon,
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
