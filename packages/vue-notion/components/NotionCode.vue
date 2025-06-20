<template>
  <pre
    class="NotionCode"
    :data-lang="
      lang
    "><code class="NotionCode__Element" :class="langClass" v-html="code"></code></pre>
</template>

<script>
  import { Blockable, blockComputed, blockProps } from '../lib/blockable';
  import { codeToHtml } from 'shiki';

  export default {
    extends: Blockable,
    props: { ...blockProps, overrideLang: String, overrideLangClass: String },
    data() {
      return {
        code: '',
      };
    },
    computed: {
      ...blockComputed,
      lang() {
        return (
          this.overrideLang ||
          this.properties?.language?.[0]?.[0]?.toLowerCase()
        );
      },
    },
    async mounted() {
      this.code = await codeToHtml(this.properties.title.flat(100)[0], {
        lang: { 'plain text': 'text' }[this.lang] ?? this.lang,
        theme: 'github-light',
      });
    },
  };
</script>

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
