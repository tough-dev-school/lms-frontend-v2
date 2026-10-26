<script lang="ts" setup>
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { useEditorAutosave } from '@/composables/useEditorAutosave';
  import { useForm } from '@inertiajs/vue3';
  import type { Lesson, QuestionDetail } from '@/api/generated';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPillHomework from '@/components/VPillHomework/VPillHomework.vue';
  import VMakrdownContent from '@/components/VMakrdownContent/VMakrdownContent.vue';
  import { getHomeworkBreadcrumbs } from './homeworkBreadcrumbs';

  const props = defineProps<{
    questionId: string;
    question: QuestionDetail;
    lesson: Lesson | null;
  }>();

  const { t } = useI18n();

  const breadcrumbs = computed(() =>
    getHomeworkBreadcrumbs(props.question, t('common.myCourses')),
  );

  const { content, clear } = useEditorAutosave(['draft', props.questionId]);

  const form = useForm({});

  // The server answers with a redirect to the created answer
  const handleCreateAnswer = () => {
    form
      .transform(() => ({ content: content.value }))
      .post(`/homework/${props.questionId}/answers`, { onSuccess: clear });
  };
</script>

<template>
  <VLoggedLayout
    :breadcrumbs="breadcrumbs"
    :title="question.name"
  >
    <template #pill>
      <VPillHomework
        v-if="lesson?.homework"
        :lesson="lesson"
      />
    </template>
    <section class="flex flex-col gap-24">
      <VMakrdownContent
        :markdown="question.markdown_text"
        :group="question.slug"
        :enable-lightbox="true"
      />
      <VCreateAnswer
        v-model="content"
        :is-pending="form.processing"
        :error="form.errors"
        @send="handleCreateAnswer"
      />
    </section>
  </VLoggedLayout>
</template>
