<script lang="ts" setup>
  import VAvatar from '@/components/VAvatar.vue';
  import VAnswerAction from '@/components/VAnswerActions.vue';
  import { relativeDate } from '@/utils/date';
  import getName from '@/utils/getName';
  import { computed, ref, withDefaults } from 'vue';
  import type { Answer } from '@/types/homework';
  import VCard from '@/components/VCard.vue';

  export interface Props {
    answer: Answer;
    showGoToAnswer: boolean;
  }

  const props = withDefaults(defineProps<Props>(), { showGoToAnswer: false });

  const emit = defineEmits(['delete', 'edit']);

  const editTime = ref(30);
  const deleteTime = ref(10);

  const to = computed(() => {
    return {
      name: 'homework-answer',
      params: { answerId: props.answer.slug },
    };
  });
</script>

<template>
  <VCard>
    <div class="mb-16 flex items-center gap-8">
      <VAvatar
        :first-name="answer.author.firstName"
        :last-name="answer.author.lastName" />
      <div class="">
        <div class="font-bold">
          {{ getName(answer.author.firstName, answer.author.lastName) }}
        </div>
        <div class="text-sub leading-tight text-gray">
          {{ relativeDate(answer.created) }}
        </div>
      </div>
      <div class="flex-grow"></div>
      <VAnswerAction
        :created="answer.created"
        :edit-time="editTime"
        :delete-time="deleteTime"
        @edit="emit('edit')"
        @delete="emit('delete')" />
      <RouterLink v-if="answer.slug && showGoToAnswer" class="Link" :to="to"
        >К ответу</RouterLink
      >
    </div>
    <div v-html="answer.text" class="prose" />
    <div class="flex flex-row-reverse empty:appearance-none">
      <slot name="footer" />
    </div>
  </VCard>
</template>
