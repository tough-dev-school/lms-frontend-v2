<script setup lang="ts">
  import { codeToHtml } from 'shiki';
  import { computed, onMounted, ref } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';

  const props = withDefaults(
    defineProps<BlockProps & { overrideLang?: string }>(),
    blockPropsDefaults,
  );
  const { properties } = useBlock(props);

  // Notion language names that shiki knows under another name
  const SHIKI_LANGS: Record<string, string> = { 'plain text': 'text' };

  const source = computed(() => properties.value?.title?.[0]?.[0] ?? '');
  const code = ref('');

  const lang = computed(
    () =>
      props.overrideLang || properties.value?.language?.[0]?.[0]?.toLowerCase(),
  );

  // shiki is async, so highlighted code appears after mount. Until then the plain code shows,
  // which is also what the server renders, so hydration matches.
  onMounted(async () => {
    code.value = await codeToHtml(source.value, {
      lang: (lang.value && SHIKI_LANGS[lang.value]) ?? lang.value ?? 'text',
      theme: 'github-light',
    });
  });
</script>

<template>
  <pre
    class="NotionCode"
    :data-lang="lang"
  ><code
    v-if="code"
    class="NotionCode__Element"
    v-html="code"
  ></code><code
    v-else
    class="NotionCode__Element"
  >{{ source }}</code></pre>
</template>

<style scoped>
  .NotionCode {
    overflow-x: auto;
    &__Element {
      display: block;
      width: fit-content;
    }
  }
  :deep(.shiki) {
    padding: 1em;
    font-size: 14px;
  }
</style>
