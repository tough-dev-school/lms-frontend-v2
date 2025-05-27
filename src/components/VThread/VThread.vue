<script lang="ts">
  export interface ThreadAction {
    name?: string;
    handle: (() => void) | (() => Promise<void>) | null;
    show: boolean;
    disabled?: boolean;
  }
</script>

<script lang="ts" setup>
  import VAnswer from '@/components/VAnswer';
  import { ref, watch } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { useRoute, useRouter } from 'vue-router';
  import {
    useHomeworkAnswerQuery,
    useHomeworkAnswerCreateMutation,
    populateAnswersCacheFromDescendants,
  } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useStorage } from '@vueuse/core';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import VExistingAnswer from '@/components/VExistingAnswer';
  import { useUserQuery } from '@/query';

  const route = useRoute();
  const router = useRouter();
  const queryClient = useQueryClient();

  const replyMode = ref(false);

  const props = defineProps<{
    answerId: string;
  }>();

  const { data: user } = useUserQuery();
  const { data: answer } = useHomeworkAnswerQuery(() => props.answerId);
  watch(
    () => answer.value,
    () => {
      if (answer.value) {
        populateAnswersCacheFromDescendants(queryClient, answer.value);
      }
    },
  );

  const prepareForScroll = (slug: string) => {
    if (route.name) {
      router.push({ name: route.name, hash: `#${slug}` });
    }
  };

  const handleUpdate = async (slug: string) => {
    replyMode.value = false;
    prepareForScroll(slug);
  };

  const target = ref<HTMLElement | null>(null);

  onClickOutside(target, () => {
    replyMode.value = false;
  });

  const { mutateAsync: createComment } =
    useHomeworkAnswerCreateMutation(queryClient);

  const commentText = useStorage(
    [
      'commentText',
      answer.value?.question,
      answer.value?.slug,
      answer.value?.parent,
    ]
      .filter(Boolean)
      .join('-'),
    '',
    localStorage,
  );

  const handleCreateComment = async () => {
    if (!answer.value) throw new Error('Answer not found');

    try {
      const newComment = await createComment({
        questionId: answer.value.question,
        parentId: answer.value.slug,
        text: commentText.value,
      });

      replyMode.value = false;

      router.push({
        ...router.currentRoute.value,
        hash: `#${newComment.slug}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMounted = (slug: string) => {
    if (router.currentRoute.value.hash.includes(slug)) {
      target.value?.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<template>
  <div v-if="answer && user">
    <div ref="target" class="group">
      <VAnswer
        v-if="answer.author.uuid !== user.uuid"
        :answer-id="answer.slug" />
      <VExistingAnswer
        v-else
        :answer-id="answer.slug"
        @mounted="handleMounted" />
      <button class="text-sm link" @click="replyMode = !replyMode">
        {{ replyMode ? 'Отменить' : 'Ответить' }}
      </button>
      <div class="thread-ruler" :class="{ 'mt-16': replyMode }">
        <VCreateAnswer
          v-show="replyMode"
          v-model="commentText"
          @send="handleCreateComment" />
      </div>
    </div>
    <div v-if="answer.descendants.length > 0" class="thread-ruler mt-32">
      <VThread
        v-for="descendant in answer.descendants"
        :key="descendant.slug"
        :answer-id="descendant.slug"
        @update="(slug) => handleUpdate(slug)" />
    </div>
  </div>
</template>

<style>
  .thread-ruler {
    @apply flex flex-col gap-16 pl-8 transition-colors tablet:pl-16 border-l border-gray border-opacity-20 hover:border-opacity-100;
  }
</style>
