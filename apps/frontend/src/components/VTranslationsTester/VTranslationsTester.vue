<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useDebounceFn } from '@vueuse/core';
  import { IconLanguage } from '@tabler/icons-vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VRadioSwitch from '@/components/VRadioSwitch/VRadioSwitch.vue';
  import { isLocale } from '@/i18n';
  import type { Locale } from '@/i18n';
  import {
    clearOverride,
    getCurrentTranslations,
    parseTranslations,
    readOverrides,
    saveOverride,
    validateTranslations,
  } from '@/i18n/overrides';

  type Status =
    | { kind: 'idle' }
    | { kind: 'applied'; warnings: string[] }
    | { kind: 'error'; problems: string[] };

  const localeOptions = [
    { value: 'en', label: 'English', icon: IconLanguage },
    { value: 'ru', label: 'Русский', icon: IconLanguage },
  ];

  const locale = ref<Locale>('en');
  const text = ref('');
  const status = ref<Status>({ kind: 'idle' });
  const isEdited = ref(false);

  watch(
    locale,
    () => {
      text.value = getCurrentTranslations(locale.value);
      isEdited.value = !!readOverrides()[locale.value];
      status.value = { kind: 'idle' };
    },
    { immediate: true },
  );

  const setLocale = (value: string) => {
    if (isLocale(value)) locale.value = value;
  };

  const apply = () => {
    try {
      const tree = parseTranslations(text.value);
      const report = validateTranslations(tree);

      if (report.invalidMessages.length > 0) {
        status.value = {
          kind: 'error',
          problems: report.invalidMessages.map(
            ({ key, error }) => `${key}: ${error}`,
          ),
        };
        return;
      }

      saveOverride(locale.value, tree);
      isEdited.value = true;
      status.value = {
        kind: 'applied',
        warnings: [
          ...report.missingKeys.map((key) => `${key} is missing`),
          ...report.unknownKeys.map((key) => `${key} is not used by the app`),
        ],
      };
    } catch (error) {
      status.value = {
        kind: 'error',
        problems: [error instanceof Error ? error.message : String(error)],
      };
    }
  };

  // Waits for a pause in typing, so half-typed text doesn't flash errors
  const applyLater = useDebounceFn(apply, 400);

  // Saves exactly what is in the editor, even if it doesn't apply yet, so no work is lost
  const handleDownload = () => {
    const url = URL.createObjectURL(
      new Blob([text.value], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = `${locale.value}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    clearOverride(locale.value);
    text.value = getCurrentTranslations(locale.value);
    isEdited.value = false;
    status.value = { kind: 'idle' };
  };
</script>

<!-- eslint-disable @intlify/vue-i18n/no-raw-text -- a Storybook-only tool for translators, it is not part of the app -->
<template>
  <div class="flex flex-col gap-16">
    <p>
      Edit the texts, then pick the same language with the globe icon in the
      toolbar and open any story. Changes are saved only in this browser.
    </p>
    <div class="flex flex-wrap items-center gap-16">
      <VRadioSwitch
        data-testid="locale"
        :model-value="locale"
        :options="localeOptions"
        @update:model-value="setLocale"
      />
      <VButton
        appearance="secondary"
        data-testid="download"
        @click="handleDownload"
      >
        Download {{ locale }}.json
      </VButton>
      <VButton
        v-if="isEdited"
        appearance="link"
        data-testid="reset"
        @click="handleReset"
      >
        Reset to repository version
      </VButton>
    </div>
    <textarea
      v-model="text"
      spellcheck="false"
      style="font-family: monospace"
      class="font-mono block h-[65vh] w-full resize-y rounded-8 border border-lightgray bg-white p-16 text-sub text-black focus:border-blue focus:outline-none"
      :class="{ 'border-red': status.kind === 'error' }"
      data-testid="editor"
      @input="applyLater"
    />
    <div
      v-if="status.kind === 'error'"
      class="text-red"
      data-testid="error"
    >
      Not applied:
      <ul class="list-inside list-disc">
        <li
          v-for="problem in status.problems"
          :key="problem"
        >
          {{ problem }}
        </li>
      </ul>
    </div>
    <div
      v-else-if="status.kind === 'applied'"
      data-testid="applied"
    >
      Applied
      <ul
        v-if="status.warnings.length > 0"
        class="list-inside list-disc text-gray"
      >
        <li
          v-for="warning in status.warnings"
          :key="warning"
        >
          {{ warning }}
        </li>
      </ul>
    </div>
  </div>
</template>
