<script lang="ts" setup>
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import { computed, ref, useTemplateRef } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { useForm, usePage } from '@inertiajs/vue3';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import VExistingAnswer from '@/components/VExistingAnswer/VExistingAnswer.vue';
  import type { AnswerTree } from '@/api/generated';
  import { useEditorAutosave } from '@/composables/useEditorAutosave';
  import { useI18n } from 'vue-i18n';

  defineOptions({ name: 'VThread' });

  const props = defineProps<{
    answer: AnswerTree;
  }>();

  const { t } = useI18n();
  const page = usePage();

  const isOwn = computed(
    () => props.answer.author.uuid === page.props.user?.uuid,
  );

  const replyMode = ref(false);

  const target = useTemplateRef('target');

  onClickOutside(target, () => {
    replyMode.value = false;
  });

  const { content, clear } = useEditorAutosave([
    'commentText',
    props.answer.question,
    props.answer.slug,
    props.answer.parent,
  ]);

  const form = useForm({});

  // The page scrolls to the new reply, it knows the slug from the flash data
  const handleCreateComment = () => {
    form
      .transform(() => ({ content: content.value, parent: props.answer.slug }))
      .post(`/homework/${props.answer.question}/answers`, {
        preserveScroll: true,
        onSuccess: () => {
          clear();
          replyMode.value = false;
        },
      });
  };
</script>

<template>
  <div
    :id="answer.slug"
    ref="target"
    class="group"
  >
    <VAnswer
      v-if="!isOwn"
      :answer="answer"
    />
    <VExistingAnswer
      v-else
      :answer="answer"
    />
    <div class="mt-4 px-8 tablet:px-16">
      <button
        class="text-sm link"
        data-testid="reply"
        @click="replyMode = !replyMode"
      >
        {{ replyMode ? t('common.cancel') : t('answer.reply') }}
      </button>
    </div>
    <div
      class="thread-ruler"
      :class="{ 'mt-16': replyMode }"
    >
      <VCreateAnswer
        v-show="replyMode"
        v-model="content"
        :is-pending="form.processing"
        :error="form.errors"
        @send="handleCreateComment"
      />
    </div>
  </div>
  <div
    v-if="answer.descendants.length > 0"
    class="thread-ruler mt-32"
  >
    <VThread
      v-for="descendant in answer.descendants"
      :key="descendant.slug"
      :answer="descendant"
    />
  </div>
</template>

<style>
  .thread-ruler {
    @apply flex flex-col gap-16 border-l border-gray border-opacity-20 pl-8 transition-colors hover:border-opacity-100 tablet:pl-16;
  }
</style>
