<script lang="ts" setup>
  import { IconFileTypePdf, IconPaperclip, IconX } from '@tabler/icons-vue';
  import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  defineProps<{
    disabled?: boolean;
  }>();

  const files = defineModel<File[]>({ required: true });

  const { t } = useI18n();

  const input = useTemplateRef('input');

  // Backend accepts only .pdf, `accept` alone can be bypassed with "All files" in the OS dialog
  const isPdf = (file: File) => file.name.toLowerCase().endsWith('.pdf');

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const selected = [...(target.files ?? [])].filter(isPdf);
    files.value = [...files.value, ...selected];
    // Reset so selecting the same file again still fires `change`
    target.value = '';
  };

  const remove = (index: number) => {
    files.value = files.value.filter((_, fileIndex) => fileIndex !== index);
  };

  // Picked files are not uploaded yet, blob URLs let the user open them before sending
  const urls = ref<string[]>([]);

  const revokeUrls = () => {
    urls.value.forEach((url) => URL.revokeObjectURL(url));
  };

  watch(
    files,
    (value) => {
      revokeUrls();
      urls.value = value.map((file) => URL.createObjectURL(file));
    },
    { immediate: true },
  );

  onBeforeUnmount(revokeUrls);
</script>

<template>
  <div class="flex flex-wrap items-center gap-8">
    <input
      ref="input"
      type="file"
      accept="application/pdf,.pdf"
      multiple
      class="hidden"
      data-testid="input"
      @change="handleChange"
    />
    <!-- Styled like the editor toolbar buttons since it lives in the editor footer -->
    <button
      type="button"
      class="flex h-40 items-center gap-4 px-8 transition-colors hover:bg-lightgray disabled:opacity-25 dark:hover:bg-darkmode-layer3"
      :disabled="disabled"
      data-testid="add"
      @click="input?.click()"
    >
      <IconPaperclip />
      {{ t('attachments.add') }}
    </button>
    <!-- Already uploaded files go between the button and the newly picked ones -->
    <slot />
    <div
      v-for="(file, index) in files"
      :key="`${file.name}-${index}`"
      class="flex h-32 max-w-full items-center gap-4 rounded-8 border border-gray border-opacity-20 pl-8 text-sub"
      data-testid="file"
    >
      <a
        :href="urls[index]"
        :download="file.name"
        class="flex min-w-0 items-center gap-4"
        data-testid="download"
      >
        <IconFileTypePdf class="shrink-0" />
        <span
          class="truncate"
          data-testid="name"
          >{{ file.name }}</span
        >
      </a>
      <button
        type="button"
        class="flex h-full items-center px-8 opacity-70 hover:opacity-100"
        :aria-label="t('attachments.remove')"
        :disabled="disabled"
        data-testid="remove"
        @click="remove(index)"
      >
        <IconX class="size-16" />
      </button>
    </div>
  </div>
</template>
