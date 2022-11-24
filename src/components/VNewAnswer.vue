<script setup lang="ts">
  import VTextEditor from '@/components/VTextEditor.vue';
  import VButton from '@/components/VButton.vue';
  import VCard from '@/components/VCard.vue';
  import { ref } from 'vue';
  import useHomework from '@/stores/homework';

  export interface Props {
    questionId: string;
    parentId?: string;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'update'): void;
  }>();
  const homework = useHomework();
  const text = ref('');

  const sendPost = async () => {
    await homework.postAnswer({
      text: text.value,
      questionId: props.questionId,
      parentId: props.parentId,
    });
    text.value = '';
    emit('update');
  };
</script>

<template>
  <VCard class="px-0 pt-0 tablet:px-0">
    <VTextEditor
      v-model="text"
      class="mb-16 rounded-t border-b border-offwhite"
      data-testid="editor" />
    <div class="flex flex-row-reverse px-32">
      <VButton
        @click="sendPost"
        :disabled="!(text.length > 0)"
        class="max-h-32 min-w-0 px-24"
        data-testid="button"
        >Отправить</VButton
      >
    </div>
  </VCard>
</template>
