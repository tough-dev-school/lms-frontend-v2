<script lang="ts" setup>
  import VAnswerActions from '@/components/VAnswerActions.vue';
  import VTextEditor from '@/components/VTextEditor.vue';
  import VButton from '@/components/VButton.vue';
  import useHomework from '@/stores/homework';
  import { ref, onMounted } from 'vue';
  import VAnswer from '@/components/VAnswer.vue';
  import VCard from '@/components/VCard.vue';
  import htmlToMarkdown from '@/utils/htmlToMarkdown';
  import type { Answer } from '@/types/homework';
  import { useRoute, useRouter } from 'vue-router';

  export interface Props {
    answer: Answer;
    questionId: string;
    parentId?: string;
    showGoToAnswer?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), { showGoToAnswer: false });

  const emit = defineEmits<{
    (e: 'update'): void;
    (e: 'delete'): void;
    (e: 'edit'): void;
  }>();

  const route = useRoute();
  const router = useRouter();

  const homework = useHomework();

  const editMode = ref(false);
  const text = ref('');
  const editTime = ref(30);
  const deleteTime = ref(10);

  const updateAnswer = async () => {
    await homework.updateAnswer(props.answer.slug, text.value);
    emit('update');
    editMode.value = false;
  };

  const handleDelete = async () => {
    if (confirm('Удалить ответ?')) {
      await homework.deleteAnswer(props.answer.slug);
      emit('update');
    }
  };

  const handleEdit = async () => {
    text.value = htmlToMarkdown(props.answer.text);
    editMode.value = true;
  };

  onMounted(() => {
    if (route.hash === `#${props.answer.slug}`) {
      if (route.name) router.push({ name: route.name, hash: route.hash });
    }
  });
</script>

<template>
  <div v-if="!editMode">
    <VAnswer :answer="answer as Answer" :showGoToAnswer="showGoToAnswer">
      <template #header>
        <VAnswerActions
          :created="answer.created"
          :edit-time="editTime"
          :delete-time="deleteTime"
          @edit="handleEdit"
          @delete="handleDelete" />
      </template>
      <template #footer>
        <slot name="footer" />
      </template>
    </VAnswer>
  </div>
  <VCard v-else class="px-0 pt-0 tablet:px-0">
    <VTextEditor
      v-model="text"
      class="mb-16 rounded-t border-b border-offwhite" />
    <div class="flex flex-row-reverse px-32">
      <VButton @click="updateAnswer" :disabled="!(text.length > 0)" class="h-32"
        >Сохранить</VButton
      >
    </div>
  </VCard>
</template>
