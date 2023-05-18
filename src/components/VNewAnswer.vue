<script setup lang="ts">
  import VTextEditor from '@/components/VTextEditor.vue';
  import VButton from '@/components/VButton.vue';
  import VCard from '@/components/VCard.vue';
  import { ref, computed, watch } from 'vue';
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

  const sendPost = async () => {
    const answer = await homework.postAnswer({
      text: text.value,
      questionId: props.questionId,
      parentId: props.parentId,
    });

    if (answer) {
      emit('update', answer.slug);
      text.value = '';
    }
  };

  const allowSend = computed(() => {
    const emptyTag = /<[\w]*><\/[\w]*>/;

    return text.value.split(emptyTag).every((node) => !!node === false)
      ? ''
      : text.value;
  });

  watch(text, (value) => {
    const key = props.parentId || props.questionId;
    localStorage.setItem(key, value);
  });
</script>

<template>
  <VCard class="pt-0">
    <VTextEditor
      v-model="text"
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
