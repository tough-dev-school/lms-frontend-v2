<script lang="ts" setup>
  import type { Answer } from '@/types/homework';
  import VPost from '@/components/VPost.vue';
  import VReply from '@/components/VReply.vue';
  import { ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';

  interface Props {
    originalPost: Answer;
  }

  const emit = defineEmits(['emit']);

  const replyMode = ref(false);

  const toggleReplyMode = () => {
    replyMode.value = !replyMode.value;
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
      <VPost :answer="originalPost">
        <template #footer>
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
      </VPost>
      <VReply
        v-if="replyMode"
        class="mt-16 ml-32"
        :questionId="originalPost.question"
        :parentId="originalPost.slug"
        @update="emit('update')" />
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
