<template>
  <pre class="wrapper"><code :class="langClass" v-html="code"></code>
</pre>
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
        lang: this.lang,
        theme: 'github-light',
      });
    },
  };
</script>

<style scoped>
  .wrapper {
    overflow-x: auto;
  }
  :deep(.shiki) {
    padding: 1em;
    font-size: 14px;
  }
</style>
