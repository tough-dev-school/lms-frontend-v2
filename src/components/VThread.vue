<script lang="ts" setup>
  import type { Answer } from '@/types/homework';
  import VOwnAnswer from '@/components/VOwnAnswer.vue';
  import VAnswer from '@/components/VAnswer.vue';
  import VNewPost from '@/components/VNewPost.vue';
  import { ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import useUser from '@/stores/user';

  export interface Props {
    originalPost: Answer;
  }

  const emit = defineEmits(['update']);
  const user = useUser();
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
      <VAnswer
        :answer="originalPost"
        v-if="originalPost.author.uuid !== user.uuid" />
      <VOwnAnswer
        v-else
        :reply="originalPost"
        :question-id="originalPost.question"
        @update="emit('update')">
        <template #post-footer>
          <button
            class="text-sub text-gray"
            :class="{
              'transition-opacity group-hover:opacity-100 tablet:opacity-0':
                !replyMode,
            }"
            @click="toggleReplyMode">
            {{ replyMode ? 'Не отвечать' : 'Ответить' }}
          </button>
        </template>
      </VOwnAnswer>
      <div class="thread-ruler" :class="{ 'mt-16': replyMode }">
        <VNewPost
          v-if="replyMode"
          :questionId="originalPost.question"
          :parentId="originalPost.slug"
          @update="handleUpdate" />
      </div>
    </div>
    <div class="thread-ruler mt-16" v-if="originalPost.descendants.length > 0">
      <VThread
        v-for="reply in originalPost.descendants"
        :originalPost="reply"
        @update="emit('update')"
        :key="reply.slug" />
    </div>
  </div>
</template>

<style scoped>
  .thread-ruler {
    @apply flex flex-col gap-16 border-l border-gray border-opacity-10 pl-8 transition-colors hover:border-opacity-25 tablet:pl-16;
  }
</style>
