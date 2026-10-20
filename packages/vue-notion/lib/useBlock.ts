import { computed } from 'vue';
import type { BlockProps } from './blockProps';
import type { BlockMap } from './types';
import { getTextContent } from './utils';

// blockMap is generic so NotionRenderer, where it is optional, can reuse it
type ResolvedBlockProps<TBlockMap extends BlockMap | undefined> = Required<
  Pick<
    BlockProps,
    | 'contentIndex'
    | 'embedAllow'
    | 'fullPage'
    | 'hideList'
    | 'katex'
    | 'level'
    | 'mapPageUrl'
    | 'pageLinkTarget'
    | 'textLinkTarget'
  >
> &
  Pick<BlockProps, 'contentId' | 'pageLinkOptions'> & { blockMap: TBlockMap };

export const useBlock = <TBlockMap extends BlockMap | undefined>(
  props: ResolvedBlockProps<TBlockMap>,
) => {
  // pageLinkTarget and textLinkTarget are not forwarded on purpose: nested
  // blocks always used the defaults, and links rely on that
  const pass = computed(() => ({
    blockMap: props.blockMap,
    contentId: props.contentId,
    contentIndex: props.contentIndex,
    embedAllow: props.embedAllow,
    fullPage: props.fullPage,
    hideList: props.hideList,
    katex: props.katex,
    level: props.level,
    mapPageUrl: props.mapPageUrl,
    pageLinkOptions: props.pageLinkOptions,
  }));

  const block = computed(() => {
    if (!props.blockMap) return undefined;
    const id = props.contentId || Object.keys(props.blockMap)[0];
    return props.blockMap[id];
  });
  const value = computed(() => block.value?.value);
  const format = computed(() => value.value?.format);
  const f = computed(() => format.value ?? {});
  const icon = computed(() => format.value?.page_icon || '');
  const width = computed(() => format.value?.block_width);
  const properties = computed(() => value.value?.properties);
  const caption = computed(() => properties.value?.caption);
  const description = computed(() => properties.value?.description);
  const title = computed(() => properties.value?.title);
  const alt = computed(() => caption.value?.[0]?.[0]);
  const src = computed(() => properties.value?.source?.[0]?.[0]);
  const type = computed(() => value.value?.type);
  const visible = computed(
    () => !type.value || !props.hideList.includes(type.value),
  );
  const hasPageLinkOptions = computed(
    () => !!(props.pageLinkOptions?.component && props.pageLinkOptions?.href),
  );
  const parent = computed(() => {
    const parentId = value.value?.parent_id;
    return parentId ? props.blockMap?.[parentId] : undefined;
  });

  const isType = (t: string | string[]) => {
    if (!visible.value || !type.value) return false;
    return Array.isArray(t) ? t.includes(type.value) : type.value === t;
  };

  const blockColorClass = (suffix = '') => {
    const blockColor = format.value?.block_color;
    return blockColor ? `notion-${blockColor}${suffix}` : undefined;
  };

  const pageLinkProps = (id: string) => ({
    [props.pageLinkOptions?.href || 'href']: props.mapPageUrl(id),
  });

  return {
    pass,
    block,
    value,
    format,
    f,
    icon,
    width,
    properties,
    caption,
    description,
    title,
    alt,
    src,
    type,
    visible,
    hasPageLinkOptions,
    parent,
    isType,
    blockColorClass,
    pageLinkProps,
    getTextContent,
  };
};
