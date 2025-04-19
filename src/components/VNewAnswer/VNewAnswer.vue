<script setup lang="ts">
  import VTextEditor from '@/components/VTextEditor/VTextEditor.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import { ref, computed, watch } from 'vue';
  import useHomework from '@/stores/homework';

  export interface Props {
    questionId: string;
    parentId?: string;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    update: [slug: string];
  }>();
  const homework = useHomework();

  const isLoading = ref(false);

  const getInitialValue = () => {
    if (props.parentId) {
      return (localStorage.getItem(props.parentId) as string) || '';
    }

    return (localStorage.getItem(props.questionId) as string) || '';
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

    isLoading.value = true;

    const answer = await homework.postAnswer({
      text: text.value,
      questionId: props.questionId,
      parentId: props.parentId,
    });

    isLoading.value = false;

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
  <div class="VNewAnswer pt-0 gap-8 flex flex-wrap">
    <VTextEditor
      v-model="text"
      data-testid="editor"
      class="w-full"
      placeholder="Напишите ответ здесь"
      @send="sendPost" />

    <VButton
      :disabled="!allowSend || isLoading"
      data-testid="button"
      @click="sendPost">
      Отправить
    </VButton>
  </div>
</template>

<style>
  .VNewAnswer .ProseMirror {
    @apply px-0 tablet:px-0;
  }
</style>
