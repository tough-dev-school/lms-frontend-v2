<script lang="ts" setup>
  import type { Thread } from '@/types/homework';
  import VOwnAnswer from '@/components/VOwnAnswer.vue';
  import VAnswer from '@/components/VAnswer.vue';
  import VNewAnswer from '@/components/VNewAnswer.vue';
  import { computed, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import useUser from '@/stores/user';

  export interface Props {
    originalPost: Thread;
  }

  const user = useUser();
  const emit = defineEmits<{
    (e: 'update'): void;
  }>();
  const replyMode = ref(false);

  const handleUpdate = () => {
    replyMode.value = false;
    emit('update');
  };

  const props = defineProps<Props>();

  const target = ref(null);

  onClickOutside(target, () => {
    replyMode.value = false;
  });

  const getRootComponent = computed(() => {
    const rootComponent: any = { answer: props.originalPost };

    rootComponent.is =
      props.originalPost.author.uuid !== user.uuid ? VAnswer : VOwnAnswer;

    rootComponent.questionId = props.originalPost.question;

    return rootComponent;
  });
</script>

<template>
  <div>
    <div class="group" ref="target">
      <component :is="getRootComponent.is" v-bind="getRootComponent">
        <template #footer>
          <button
            :class="{
              'transition-opacity group-hover:opacity-100 tablet:opacity-0':
                !replyMode,
            }"
            @click="replyMode = !replyMode">
            {{ replyMode ? 'Не отвечать' : 'Ответить' }}
          </button>
        </template>
      </component>
      <div class="thread-ruler" :class="{ 'mt-16': replyMode }">
        <VNewAnswer
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
