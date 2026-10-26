<script lang="ts" setup>
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { ref } from 'vue';
  import { router, useForm } from '@inertiajs/vue3';
  import type { AnswerTree } from '@/api/generated';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    answer: AnswerTree;
  }>();

  const { t } = useI18n();

  const isEdit = ref(false);

  const form = useForm({ content: props.answer.content });

  // Deleting the answer the page is about lands on the question, the server handles that redirect
  const handleDelete = () => {
    if (!confirm(t('answer.deleteConfirm'))) return;
    router.delete(`/homework/answers/${props.answer.slug}`, {
      preserveScroll: true,
    });
  };

  const handleUpdate = () => {
    form.patch(`/homework/answers/${props.answer.slug}`, {
      preserveScroll: true,
      onSuccess: () => {
        isEdit.value = false;
      },
    });
  };
</script>

<template>
  <VAnswer
    v-if="!isEdit"
    :answer="answer"
  >
    <template #header>
      <VAnswerActions
        v-if="answer.is_editable"
        @edit="isEdit = true"
        @delete="handleDelete"
      />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </VAnswer>
  <VCreateAnswer
    v-else-if="isEdit"
    v-model="form.content"
    :legacy-text="answer.legacy_text"
    :is-pending="form.processing"
    :error="form.errors"
    @send="handleUpdate"
  />
</template>
