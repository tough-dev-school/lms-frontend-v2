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
    (e: 'update', slug: string): void;
  }>();
  const homework = useHomework();
  const text = ref('');

  const sendPost = async () => {
    const answer = await homework.postAnswer({
      text: text.value,
      questionId: props.questionId,
      parentId: props.parentId,
    });
    console.log(answer);
    text.value = '';
    emit('update', answer.slug);
  };
</script>

<template>
  <VCard class="pt-0">
    <VTextEditor
      v-model="text"
      class="-mb-32 rounded-t border-offwhite dark:border-dark-black"
      data-testid="editor"
      placeholder="Напишите ответ здесь" />
    <template #footer>
      <VButton
        @click="sendPost"
        :disabled="!(text.length > 0)"
        data-testid="button"
        >Отправить</VButton
      >
    </template>
  </VCard>
</template>
