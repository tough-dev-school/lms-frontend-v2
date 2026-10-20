// A decoration is a key with an optional value, e.g. ['b'] or ['a', url]
export type Decoration = [key: string, value?: string];

export type TextChunk = [text: string, decorations?: Decoration[]];

export type RichText = TextChunk[];

export interface BlockFormat {
  block_aspect_ratio?: number;
  block_color?: string;
  block_height?: number;
  block_page_width?: boolean;
  block_width?: number;
  bookmark_cover?: string;
  bookmark_icon?: string;
  column_ratio?: number;
  display_source?: string;
  page_cover?: string;
  page_cover_position?: number;
  page_full_width?: boolean;
  page_icon?: string;
  page_small_text?: boolean;
  table_block_column_header?: boolean;
  table_block_column_order?: string[];
  table_block_row_header?: boolean;
  transclusion_reference_pointer?: { id: string };
  [key: string]: unknown;
}

export interface BlockValue {
  id: string;
  type: string;
  parent_id?: string;
  content?: string[];
  properties?: Record<string, RichText | undefined>;
  format?: BlockFormat;
}

export interface Block {
  value: BlockValue;
}

export type BlockMap = Record<string, Block>;

export interface PageLinkOptions {
  // A component object or the name of a globally registered one, e.g. 'RouterLink'
  component: string | object;
  // The prop that receives the mapped url, e.g. 'to' for RouterLink
  href: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
  sub: TocItem[];
}
