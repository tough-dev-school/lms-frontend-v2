<script lang="ts">
  export interface VNotionViewProps {
    forceNew?: boolean;
    id: string;
    rendererProps: any;
  }
</script>

<script lang="ts" setup>
  import VNewNotionRenderer from './VNewNotionRenderer.vue';
  import VOldNotionRenderer from './VOldNotionRenderer.vue';
  import { computed } from 'vue';
  import 'prismjs';
  import 'prismjs/themes/prism.css';
  import 'prismjs/components/prism-typescript.js';
  import 'prismjs/components/prism-ruby.js';
  import 'prismjs/components/prism-python.js';
  import 'prismjs/components/prism-bash.js';
  import 'prismjs/components/prism-c.js';
  import 'prismjs/components/prism-cpp.js';

  const props = withDefaults(defineProps<VNotionViewProps>(), {
    forceNew: false,
  });

  const isNewRender = computed(() => {
    const MATERIALS_WHITELIST: string[] = [
      '2b333be410e64c178ef46fc1d24bc3ae',
      '3ec0494719004d709f70081fcd0040d8',
      'bff4654a65054375a6f9caaf574c3a75',
      '05797ac75d614b66895b5c7fb5bfa019',
      '67104a06964f40818ff88fe25d7dc20d',
      'a3cca3c25f934817a9500d39c5aeb81a',
      '177686e1258940c2ace9f94765c54fbe',
      'cf1379bfbf5a41f9942f31dd4253c178',
    ];

    return props.forceNew || MATERIALS_WHITELIST.includes(props.id);
  });
</script>

<template>
  <div class="dete">
    <component
      :is="isNewRender ? VNewNotionRenderer : VOldNotionRenderer"
      v-bind="rendererProps"
      prism />
  </div>
</template>
