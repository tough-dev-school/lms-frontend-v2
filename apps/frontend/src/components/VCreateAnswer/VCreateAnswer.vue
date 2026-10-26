<script lang="ts" setup>
  import VTextEditor from '@/components/VTextEditor/VTextEditor.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { computed, useTemplateRef } from 'vue';
  import VError from '@/components/VError/VError.vue';
  import VAnswerAttachments from '@/components/VAnswerAttachments/VAnswerAttachments.vue';
  import VAttachmentsInput from '@/components/VAttachmentsInput/VAttachmentsInput.vue';
  import type { FormError } from '@/types/error';
  import type { AnswerAttachment } from '@/api/generated';
  import { useI18n } from 'vue-i18n';

  const props = withDefaults(
    defineProps<{
      legacyText?: string;
      isPending: boolean;
      error: FormError;
      allowAttachments?: boolean;
      existingAttachments?: AnswerAttachment[];
    }>(),
    {
      legacyText: undefined,
      allowAttachments: false,
      existingAttachments: () => [],
    },
  );

  const emit = defineEmits<{
    send: [];
  }>();

  const { t } = useI18n();

  const content = defineModel<Record<string, unknown>>({ required: true });
  const files = defineModel<File[]>('files', { default: () => [] });

  const editor = useTemplateRef<InstanceType<typeof VTextEditor>>('editor');

  const isDisabled = computed(
    () => editor.value?.isEmpty !== false || props.isPending,
  );
</script>

<template>
  <div class="SendOwnAnswer__Container">
    <VTextEditor
      ref="editor"
      v-model="content"
      :legacy-text="legacyText"
      class="SendOwnAnswer__Editor"
      @send="emit('send')"
    >
      <template
        v-if="allowAttachments"
        #footer
      >
        <VAttachmentsInput
          v-model="files"
          :disabled="isPending"
          data-testid="attachments-input"
        >
          <VAnswerAttachments
            :attachments="existingAttachments"
            data-testid="existing-attachments"
          />
        </VAttachmentsInput>
      </template>
    </VTextEditor>
    <div class="SendOwnAnswer__Footer">
      <VError :error="error" />
      <VButton
        :disabled="isDisabled"
        :loading="isPending"
        class="h-32"
        @click="emit('send')"
      >
        {{ isPending ? t('common.sending') : t('common.send') }}
      </VButton>
    </div>
  </div>
</template>

<style scoped>
  .SendOwnAnswer {
    &__Container {
      @apply px-0 pt-0 tablet:px-0;
    }
    &__Editor {
      @apply mb-16 rounded-t;
    }
    &__Footer {
    }
  }
</style>
