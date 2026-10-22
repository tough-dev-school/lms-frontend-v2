<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import type { BlockValue, TocItem } from '../lib/types';
  import NotionTableOfContentsItem from './NotionTableOfContentsItem.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);

  // The order of keys in blockMap can be wrong, so the order comes from the
  // page block's content
  const blockKeys = computed(() => {
    const page = Object.values(props.blockMap).find(
      (block) => block.value.type === 'page',
    );
    return page?.value.content ?? [];
  });

  const flatToc = computed<TocItem[]>(() =>
    blockKeys.value
      .map((key) => props.blockMap[key]?.value)
      .filter((block): block is BlockValue => !!block?.type.includes('header'))
      .map((block) => ({
        id: block.id,
        title: (block.properties?.title ?? [])
          .flat()
          .filter((v) => typeof v === 'string')
          .join(''),
        // header = 1, sub_header = 2, sub_sub_header = 3
        level: block.type
          .split('_')
          .reduce(
            (accumulator, part) =>
              part === 'sub' ? accumulator + 1 : accumulator,
            1,
          ),
        sub: [],
      })),
  );

  // Nests each heading under the closest previous heading of a lower level
  const buildTree = (items: TocItem[]) => {
    const stack: TocItem[] = [];
    const nestedItems: TocItem[] = [];

    const popInto = () => {
      const subItem = stack.pop()!;
      if (stack.length) {
        stack.at(-1)!.sub.push(subItem);
      } else {
        nestedItems.push(subItem);
      }
    };

    items.forEach((item) => {
      while (stack.length && item.level <= stack.at(-1)!.level) {
        popInto();
      }
      stack.push(item);
    });

    while (stack.length) {
      popInto();
    }

    return nestedItems;
  };

  const toc = computed(() => buildTree(flatToc.value));
</script>

<template>
  <ul
    class="notion-table-of-contents"
    style="margin-left: -16px"
  >
    <NotionTableOfContentsItem
      v-for="item in toc"
      :key="item.id"
      :item="item"
    />
  </ul>
</template>
