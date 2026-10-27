<script lang="ts" setup>
  import { IconFileTypePdf } from '@tabler/icons-vue';
  import { useI18n } from 'vue-i18n';
  import type { AnswerAttachment } from '@/api/generated';

  defineProps<{
    attachments: AnswerAttachment[];
  }>();

  const { t } = useI18n();
</script>

<template>
  <ul
    v-if="attachments.length > 0"
    class="flex flex-wrap gap-8"
  >
    <li
      v-for="(attachment, index) in attachments"
      :key="attachment.id"
    >
      <!-- Backend stores files under random names, so the original filename is lost.
           `download` is ignored for cross-origin URLs, then the file opens in a new tab instead -->
      <a
        :href="attachment.file"
        target="_blank"
        rel="noopener noreferrer"
        download
        class="flex h-32 items-center gap-4 rounded-8 border border-gray border-opacity-20 px-8 text-sub transition-colors hover:border-opacity-100"
        data-testid="attachment"
      >
        <IconFileTypePdf class="shrink-0" />
        {{ t('attachments.file', { number: index + 1 }) }}
      </a>
    </li>
  </ul>
</template>
