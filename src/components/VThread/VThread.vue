<script lang="ts">
  export interface ThreadAction {
    name?: string;
    handle: (() => void) | (() => Promise<void>) | null;
    show: boolean;
    disabled?: boolean;
  }
</script>

<script lang="ts" setup>
  import VOwnAnswer from '@/components/VOwnAnswer/VOwnAnswer.vue';
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import { ref, watch } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import useUser from '@/stores/user';
  import { useRoute, useRouter } from 'vue-router';
  import {
    useHomeworkAnswerQuery,
    useHomeworkAnswerCreateMutation,
    populateAnswersCacheFromDescendants,
  } from '@/query';
  import VSendOwnAnswer from '../VSendOwnAnswer/VSendOwnAnswer.vue';
  import { useQueryClient } from '@tanstack/vue-query';

  const route = useRoute();
  const router = useRouter();
  const queryClient = useQueryClient();

  const user = useUser();
  const replyMode = ref(false);

  const props = defineProps<{
    answerId: string;
  }>();

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

  const handleCreateComment = async (text: string) => {
    if (!answer.value) throw new Error('Answer not found');

    const newComment = await createComment({
      questionId: answer.value.question,
      parentId: answer.value.slug,
      text,
    });

    router.push({
      ...router.currentRoute.value,
      hash: `#${newComment.slug}`,
    });
  };

  const handleMounted = (slug: string) => {
    if (router.currentRoute.value.hash.includes(slug)) {
      target.value?.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<template>
  <div v-if="answer">
    <div ref="target" class="group">
      <VAnswer
        v-if="answer.author.uuid !== user.uuid"
        :answer-id="answer.slug" />
      <VOwnAnswer v-else :answer-id="answer.slug" @mounted="handleMounted" />
      <button class="text-sm link" @click="replyMode = !replyMode">
        {{ replyMode ? 'Отменить' : 'Ответить' }}
      </button>
      <div class="thread-ruler" :class="{ 'mt-16': replyMode }">
        <VSendOwnAnswer
          v-show="replyMode"
          :draft-key="[answer.question, answer.slug]"
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
