<template>
  <pre
    :class="[
      'notion-code',
      langClass,
    ]"><code :class="langClass"><template v-for="(segment, segmentIndex) in properties.title" :key="segmentIndex">{{ segment[0] }}</template></code>
</pre>
</template>

<script>
  import { Blockable, blockComputed, blockProps } from '../lib/blockable';

  export default {
    extends: Blockable,
    props: { ...blockProps, overrideLang: String, overrideLangClass: String },
    computed: {
      ...blockComputed,
      lang() {
        return (
          this.overrideLang ||
          this.properties?.language?.[0]?.[0]?.toLowerCase()
        );
      },
      langClass() {
        return this.overrideLangClass || `language-${this.lang}`;
      },
    },
  };
</script>
