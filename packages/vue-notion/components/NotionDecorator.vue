<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import { KATEX_ELEMENT } from '../lib/utils';
  import type { TextChunk } from '../lib/types';

  const props = withDefaults(
    defineProps<BlockProps & { content?: TextChunk }>(),
    blockPropsDefaults,
  );
  const { pass, type, hasPageLinkOptions, pageLinkProps } = useBlock(props);

  const text = computed(() => props.content?.[0]);
  const decorators = computed(() => props.content?.[1] || []);
  const decoratorKey = computed(() => decorators.value[0]?.[0]);
  const decoratorValue = computed(() => decorators.value[0]?.[1] ?? '');

  // Each NotionDecorator applies the first decorator and passes the rest on
  const nextContent = computed<TextChunk>(() => [
    text.value ?? '',
    decorators.value.slice(1),
  ]);

  const isPageLink = computed(() => text.value === '‣');
  const isInlinePageLink = computed(() => decoratorValue.value.startsWith('/'));

  const pageLinkTitle = computed(
    () =>
      props.blockMap?.[decoratorValue.value]?.value?.properties
        ?.title?.[0]?.[0] || 'link',
  );

  const target = computed(() =>
    type.value === 'page' ? props.pageLinkTarget : props.textLinkTarget,
  );
</script>

<template>
  <component
    v-bind="pageLinkProps(decoratorValue)"
    :is="pageLinkOptions?.component"
    v-if="isPageLink && hasPageLinkOptions"
    class="notion-link"
  >
    {{ pageLinkTitle }}
  </component>
  <a
    v-else-if="isPageLink"
    class="notion-link"
    :target="pageLinkTarget"
    :href="mapPageUrl(decoratorValue)"
    >{{ pageLinkTitle }}</a
  >
  <component
    v-bind="pageLinkProps(decoratorValue.slice(1))"
    :is="pageLinkOptions?.component"
    v-else-if="decoratorKey === 'a' && hasPageLinkOptions && isInlinePageLink"
    class="notion-link"
  >
    <NotionDecorator
      :content="nextContent"
      v-bind="pass"
    />
  </component>
  <a
    v-else-if="decoratorKey === 'a' && isInlinePageLink"
    class="notion-link"
    :target="target"
    :href="mapPageUrl(decoratorValue.slice(1))"
  >
    <NotionDecorator
      :content="nextContent"
      v-bind="pass"
    />
  </a>
  <a
    v-else-if="decoratorKey === 'a'"
    class="notion-link"
    :target="target"
    :href="decoratorValue"
  >
    <NotionDecorator
      :content="nextContent"
      v-bind="pass"
    />
  </a>
  <span v-else-if="decorators.length === 0">{{ text }}</span>
  <span
    v-else-if="decoratorKey === 'h'"
    :class="'notion-' + decoratorValue"
  >
    <NotionDecorator
      :content="nextContent"
      v-bind="pass"
    />
  </span>
  <code
    v-else-if="decoratorKey === 'c'"
    class="notion-inline-code"
  >
    <NotionDecorator
      :content="nextContent"
      v-bind="pass"
    />
  </code>
  <b v-else-if="decoratorKey === 'b'">
    <NotionDecorator
      :content="nextContent"
      v-bind="pass"
    />
  </b>
  <em v-else-if="decoratorKey === 'i'">
    <NotionDecorator
      :content="nextContent"
      v-bind="pass"
    />
  </em>
  <s v-else-if="decoratorKey === 's'">
    <NotionDecorator
      :content="nextContent"
      v-bind="pass"
    />
  </s>
  <component
    :is="KATEX_ELEMENT"
    v-else-if="decoratorKey === 'e' && katex"
    :expression="decoratorValue"
  />
  <code
    v-else-if="decoratorKey === 'e'"
    class="notion-inline-code"
  >
    {{ decoratorValue }}
  </code>
  <NotionDecorator
    v-else
    :content="nextContent"
    v-bind="pass"
  />
</template>
