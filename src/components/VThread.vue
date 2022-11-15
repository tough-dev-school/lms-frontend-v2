<script lang="ts" setup>
  import type { Answer } from '@/types/homework';
  import VReply from '@/components/VReply.vue';
  import { ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';

  export interface Props {
    originalPost: Answer;
  }

  const emit = defineEmits(['update']);

  const replyMode = ref(false);

  const toggleReplyMode = () => {
    replyMode.value = !replyMode.value;
  };

  const handleUpdate = () => {
    replyMode.value = false;
    emit('update');
  };

  defineProps<Props>();

  const target = ref(null);

  onClickOutside(target, () => {
    replyMode.value = false;
  });
</script>

<template>
  <div>
    <div class="group" ref="target">
      <VReply
        :reply="originalPost"
        :question-id="originalPost.question"
        @update="emit('update')">
        <template #post-footer>
          <button
            class="text-sub text-gray"
            :class="{
              'opacity-0 transition-opacity group-hover:opacity-100':
                !replyMode,
            }"
            @click="toggleReplyMode">
            {{ replyMode ? 'Не отвечать' : 'Ответить' }}
          </button>
        </template>
      </VReply>
      <VReply
        v-if="replyMode"
        class="mt-16 ml-32"
        :questionId="originalPost.question"
        :parentId="originalPost.slug"
        @update="handleUpdate" />
    </div>
    <div
      class="mt-16 flex flex-col gap-16 pl-16"
      v-if="originalPost.descendants.length > 0">
      <VThread
        v-for="reply in originalPost.descendants"
        :originalPost="reply"
        @update="emit('update')"
        :key="reply.slug" />
    </div>
  </div>
</template>
