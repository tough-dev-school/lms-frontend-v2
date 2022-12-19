<script lang="ts" setup>
  import type { Answer } from '@/types/homework';
  import VOwnAnswer from '@/components/VOwnAnswer.vue';
  import VAnswer from '@/components/VAnswer.vue';
  import VThread from '@/components/VThread.vue';
  import VPreloader from '@/components/VPreloader.vue';
  import VNewAnswer from '@/components/VNewAnswer.vue';
  import { getComments } from '@/api/homework';
  import { ref, watch } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import useUser from '@/stores/user';

  export interface Props {
    originalPost: Answer;
  }

  const props = defineProps<Props>();

  const descendants = ref([]);

  const user = useUser();
  const emit = defineEmits<{
    (e: 'update'): void;
  }>();
  const replyMode = ref(false);

  const handleUpdate = () => {
    replyMode.value = false;
    emit('update');
  };

  const isLoading = ref(false);

  const fetchComments = async () => {
    isLoading.value = true;
    descendants.value = (await getComments([props.originalPost.slug])).at(
      -1,
    ).descendants;
    isLoading.value = false;
  };

  watch(replyMode, async (value) => {
    if (value) await fetchComments();
    else {
      descendants.value = [];
    }
  });

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
        v-if="originalPost.author.uuid !== user.uuid">
        <template #footer>
          <VReplyToggle v-model="replyMode" />
        </template>
      </VAnswer>
      <VOwnAnswer
        v-else
        :answer="originalPost"
        :question-id="originalPost.question"
        @update="emit('update')">
        <template #answer-footer>
          <VReplyToggle v-model="replyMode" />
        </template>
      </VOwnAnswer>
      <div class="thread-ruler" :class="{ 'mt-16': replyMode }">
        <VNewAnswer
          v-if="replyMode"
          :questionId="originalPost.question"
          :parentId="originalPost.slug"
          @update="handleUpdate" />
      </div>
    </div>
    <div class="thread-ruler mt-16" v-if="!isLoading && descendants.length > 0">
      <VThread
        v-for="reply in descendants"
        :originalPost="reply"
        @update="emit('update')"
        :key="reply.slug" />
    </div>
    <div v-else-if="isLoading" class="relative h-256">
      <VPreloader class="absolute" />
    </div>
  </div>
</template>

<style scoped>
  .thread-ruler {
    @apply flex flex-col gap-16 border-l border-gray border-opacity-10 pl-8 transition-colors hover:border-opacity-25 tablet:pl-16;
  }
</style>
