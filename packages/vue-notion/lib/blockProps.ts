import type { BlockMap, PageLinkOptions } from './types';
import { defaultMapPageUrl } from './utils';

// Every block component accepts these props, and passes them down via
// `pass` from useBlock, so nested blocks see the same renderer options
export interface BlockProps {
  blockMap: BlockMap;
  contentId?: string;
  contentIndex?: number;
  embedAllow?: string;
  fullPage?: boolean;
  hideList?: string[];
  katex?: boolean;
  level?: number;
  mapPageUrl?: (pageId: string) => string;
  pageLinkOptions?: PageLinkOptions;
  pageLinkTarget?: string;
  textLinkTarget?: string;
}

export const blockPropsDefaults = {
  contentIndex: 0,
  embedAllow: 'fullscreen',
  fullPage: false,
  hideList: () => [],
  katex: false,
  level: 0,
  mapPageUrl: defaultMapPageUrl,
  pageLinkTarget: '_self',
  textLinkTarget: '_blank',
};
