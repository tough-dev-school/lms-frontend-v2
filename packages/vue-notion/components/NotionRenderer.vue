<template>
  <NotionBlock
    v-if="blockMap && value"
    v-bind="pass"
    :style="{ paddingLeft: `${level > 1 ? `${level * 10}px` : undefined}` }">
    <NotionRenderer
      v-for="(contentId, contentIndex) in value.content"
      v-bind="pass"
      :id="uuidToId(contentId)"
      :key="contentId"
      :level="level + 1"
      :content-id="contentId"
      :content-index="contentIndex"
      style="overflow-wrap: break-word" />
  </NotionBlock>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionBlock from './NotionBlock.vue';

  import { defaultMapPageUrl } from '../lib/utils';

  export default {
    components: {
      NotionBlock,
    },
    extends: Blockable,
    props: {
      blockMap: [Object],
      contentId: String,
      contentIndex: { type: Number, default: 0 },
      fullPage: { type: Boolean, default: false },
      hideList: { type: Array, default: () => [] },
      level: { type: Number, default: 0 },
      mapPageUrl: { type: Function, default: defaultMapPageUrl },
      pageLinkOptions: Object,
      imageOptions: Object,
      todo: { type: Boolean, default: false },
    },
    methods: {
      uuidToId(uuid) {
        return uuid.replaceAll('-', '');
      },
    },
  };
</script>
