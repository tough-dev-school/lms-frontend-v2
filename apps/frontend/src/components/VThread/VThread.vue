<script lang="ts">
  export interface ThreadAction {
    name?: string;
    handle: (() => void) | (() => Promise<void>) | null;
    show: boolean;
    disabled?: boolean;
  }
</script>

<script lang="ts" setup>
  /* eslint-disable import-x/first */
  import VAnswer from '@/components/VAnswer';
  import { ref, useTemplateRef } from 'vue';
  import { onClickOutside, useStorage } from '@vueuse/core';
  import { useRoute, useRouter } from 'vue-router';
  import { useHomeworkAnswerCreateMutation } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import VExistingAnswer from '@/components/VExistingAnswer';
  import type { AnswerTree, User } from '@/api/generated-api';
  import VThreadProvider from '.';

  const props = defineProps<{
    answer: AnswerTree;
    user: User;
  }>();

  const route = useRoute();
  const router = useRouter();
  const queryClient = useQueryClient();

  const replyMode = ref(false);

  const prepareForScroll = (slug: string) => {
    if (route.name) {
      router.push({ name: route.name, hash: `#${slug}` });
    }
  };

  const handleUpdate = async (slug: string) => {
    replyMode.value = false;
    prepareForScroll(slug);
  };

  const target = useTemplateRef('target');

  onClickOutside(target, () => {
    replyMode.value = false;
  });

  const { mutateAsync: createComment, isPending: isCreateCommentPending } =
    useHomeworkAnswerCreateMutation(queryClient);

  const commentText = useStorage(
    [
      'commentText',
      props.answer.question,
      props.answer.slug,
      props.answer.parent,
    ]
      .filter(Boolean)
      .join('-'),
    '',
    localStorage,
  );

  const handleCreateComment = async () => {
    if (!props.answer) throw new Error('Answer not found');

    try {
      const newComment = await createComment({
        questionId: props.answer.question,
        parentId: props.answer.slug,
        text: commentText.value,
      });

      commentText.value = '';

      replyMode.value = false;

      router.push({
        ...router.currentRoute.value,
        hash: `#${newComment.slug}`,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const handleMounted = (slug: string) => {
    if (router.currentRoute.value.hash.includes(slug)) {
      target.value?.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<template>
  <div ref="target" class="group">
    <VAnswer v-if="answer.author.uuid !== user.uuid" :answer-id="answer.slug" />
    <VExistingAnswer
      v-else
      :answer-id="answer.slug"
      @after-create="handleMounted" />
    <button class="text-sm link" @click="replyMode = !replyMode">
      {{ replyMode ? 'Отменить' : 'Ответить' }}
    </button>
    <div class="thread-ruler" :class="{ 'mt-16': replyMode }">
      <VCreateAnswer
        v-show="replyMode"
        v-model="commentText"
        :is-pending="isCreateCommentPending"
        @send="handleCreateComment" />
    </div>
  </div>
  <div v-if="answer.descendants.length > 0" class="thread-ruler mt-32">
    <VThreadProvider
      v-for="descendant in answer.descendants"
      :key="descendant.slug"
      :answer-id="descendant.slug"
      @update="(slug) => handleUpdate(slug)" />
  </div>
</template>

<style>
  .thread-ruler {
    @apply flex flex-col gap-16 pl-8 transition-colors tablet:pl-16 border-l border-gray border-opacity-20 hover:border-opacity-100;
  }
</style>
