<script lang="ts" setup>
  import type { Answer, Comment } from '@/types/homework';

  import { getComments } from '@/api/homework';
  import { VPreloader } from '@/components/VPreloader';
  import { type ThreadAction, VThread } from '@/components/VThread';
  import { computed, ref } from 'vue';
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
      handle: fetchComments,
      icon: MessagesIcon,
      name: 'Загрузить комментарии',
      show: props.originalPost.hasDescendants && descendants.value.length === 0,
    },
    {
      disabled: true,
      handle: null,
      icon: MessagesOffIcon,
      name: 'Комментариев нет',
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
