<script setup lang="ts">
  import { VButton } from '@/components/VButton';
  import { VCard } from '@/components/VCard';
  import { VTextEditor } from '@/components/VTextEditor';
  import useHomework from '@/stores/homework';
  import { computed, ref, watch } from 'vue';

  export interface Props {
    parentId?: string;
    questionId: string;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    update: [slug: string];
  }>();
  const homework = useHomework();

  const getInitialValue = () => {
    if (props.parentId && localStorage.getItem(props.parentId)) {
      return localStorage.getItem(props.parentId) as string;
    } else if (localStorage.getItem(props.questionId)) {
      return localStorage.getItem(props.questionId) as string;
    } else {
      return '';
    }
  };

  const text = ref(getInitialValue());

  const allowSend = computed(() => {
    const emptyTag = /<[\w]*><\/[\w]*>/;

    return text.value.split(emptyTag).every((node) => !!node === false)
      ? ''
      : text.value;
  });

  const sendPost = async () => {
    if (!allowSend.value) return;

    const answer = await homework.postAnswer({
      parentId: props.parentId,
      questionId: props.questionId,
      text: text.value,
    });

    if (answer) {
      emit('update', answer.slug);
      text.value = '';
    }
  };

  watch(text, (value) => {
    const key = props.parentId || props.questionId;
    localStorage.setItem(key, value);
  });
</script>

<template>
  <VCard class="VNewAnswer pt-0">
    <VTextEditor
      v-model="text"
      @send="sendPost"
      class="-mb-32 rounded-t border-offwhite dark:border-dark-black"
      data-testid="editor"
      placeholder="Напишите ответ здесь" />
    <template #footer>
      <VButton @click="sendPost" :disabled="!allowSend" data-testid="button"
        >Отправить</VButton
      >
    </template>
  </VCard>
</template>

<style>
  .VNewAnswer .ProseMirror {
    @apply px-0 tablet:px-0;
  }
</style>
