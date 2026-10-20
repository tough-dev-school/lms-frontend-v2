// Block types that the app mock (mockNotionMaterial) does not cover.
// Ids are fixed so DOM snapshots stay stable.

export const EXTRA_PAGE_ID = '00000000-0000-4000-8000-000000000000';
export const SUBPAGE_ID = '00000000-0000-4000-8000-000000000010';
export const TODO_PLAIN_ID = '00000000-0000-4000-8000-000000000020';
export const TODO_IMAGE_ID = '00000000-0000-4000-8000-000000000021';
export const TODO_IMAGE_CHILD_ID = '00000000-0000-4000-8000-000000000022';
export const TODO_TEXT_CHILD_ID = '00000000-0000-4000-8000-000000000023';
export const DECORATED_TEXT_ID = '00000000-0000-4000-8000-000000000030';
export const COLORED_TEXT_ID = '00000000-0000-4000-8000-000000000031';
export const BLANK_TEXT_ID = '00000000-0000-4000-8000-000000000032';
export const BLANK_TEXT_CHILD_ID = '00000000-0000-4000-8000-000000000033';
export const TOGGLE_ID = '00000000-0000-4000-8000-000000000040';
export const TOGGLE_CHILD_ID = '00000000-0000-4000-8000-000000000041';
export const EQUATION_ID = '00000000-0000-4000-8000-000000000050';
export const NUMBERED_A_ID = '00000000-0000-4000-8000-000000000060';
export const NUMBERED_A1_ID = '00000000-0000-4000-8000-000000000061';
export const NUMBERED_B_ID = '00000000-0000-4000-8000-000000000062';
export const BULLETED_ID = '00000000-0000-4000-8000-000000000063';
export const BULLETED_CHILD_ID = '00000000-0000-4000-8000-000000000064';
export const SYNC_CONTAINER_ID = '00000000-0000-4000-8000-000000000070';
export const SYNC_CHILD_ID = '00000000-0000-4000-8000-000000000071';
export const SYNC_REFERENCE_ID = '00000000-0000-4000-8000-000000000072';
export const EMBED_ID = '00000000-0000-4000-8000-000000000080';
export const VIDEO_ID = '00000000-0000-4000-8000-000000000081';
export const FIGMA_ID = '00000000-0000-4000-8000-000000000082';
export const CALLOUT_ID = '00000000-0000-4000-8000-000000000090';
export const CALLOUT_CHILD_ID = '00000000-0000-4000-8000-000000000091';
export const UNKNOWN_ID = '00000000-0000-4000-8000-0000000000a0';
export const TABLE_ID = '00000000-0000-4000-8000-0000000000b0';
export const TABLE_ROW_1_ID = '00000000-0000-4000-8000-0000000000b1';
export const TABLE_ROW_2_ID = '00000000-0000-4000-8000-0000000000b2';

const block = (
  id: string,
  type: string,
  parentId: string,
  rest: Record<string, unknown> = {},
) => ({
  [id]: { value: { id, type, parent_id: parentId, ...rest } },
});

export const extraBlocksPage = () => ({
  ...block(EXTRA_PAGE_ID, 'page', 'ffffffff-ffff-4fff-8fff-ffffffffffff', {
    properties: { title: [['Extra blocks']] },
    format: { page_icon: 'https://example.com/icon.png' },
    content: [
      SUBPAGE_ID,
      TODO_PLAIN_ID,
      TODO_IMAGE_ID,
      DECORATED_TEXT_ID,
      COLORED_TEXT_ID,
      BLANK_TEXT_ID,
      TOGGLE_ID,
      EQUATION_ID,
      NUMBERED_A_ID,
      NUMBERED_B_ID,
      BULLETED_ID,
      SYNC_CONTAINER_ID,
      SYNC_REFERENCE_ID,
      EMBED_ID,
      VIDEO_ID,
      FIGMA_ID,
      CALLOUT_ID,
      UNKNOWN_ID,
      TABLE_ID,
    ],
  }),
  ...block(SUBPAGE_ID, 'page', EXTRA_PAGE_ID, {
    properties: { title: [['Sub page']] },
    format: { page_icon: '📄' },
  }),
  ...block(TODO_PLAIN_ID, 'to_do', EXTRA_PAGE_ID, {
    properties: { title: [['Plain todo']] },
  }),
  ...block(TODO_IMAGE_ID, 'to_do', EXTRA_PAGE_ID, {
    properties: { title: [['Checked todo']], checked: [['Yes']] },
    content: [TODO_IMAGE_CHILD_ID, TODO_TEXT_CHILD_ID],
  }),
  ...block(TODO_IMAGE_CHILD_ID, 'image', TODO_IMAGE_ID, {
    properties: {
      source: [['https://example.com/todo.png']],
      caption: [['Todo image']],
    },
    format: { block_width: 300, block_height: 200 },
  }),
  ...block(TODO_TEXT_CHILD_ID, 'text', TODO_IMAGE_ID, {
    properties: { title: [['Todo child text']] },
  }),
  ...block(DECORATED_TEXT_ID, 'text', EXTRA_PAGE_ID, {
    properties: {
      title: [
        ['plain '],
        ['bold', [['b']]],
        ['italic', [['i']]],
        ['strike', [['s']]],
        ['code', [['c']]],
        ['red', [['h', 'red']]],
        ['bold italic', [['b'], ['i']]],
        ['external', [['a', 'https://example.com']]],
        ['internal', [['a', '/0000000000004000800000000000ffff']]],
        ['‣', [['p', SUBPAGE_ID]]],
        ['⁍', [['e', 'x^2']]],
      ],
    },
  }),
  ...block(COLORED_TEXT_ID, 'text', EXTRA_PAGE_ID, {
    properties: { title: [['Blue text']] },
    format: { block_color: 'blue' },
  }),
  ...block(BLANK_TEXT_ID, 'text', EXTRA_PAGE_ID, {
    content: [BLANK_TEXT_CHILD_ID],
  }),
  ...block(BLANK_TEXT_CHILD_ID, 'text', BLANK_TEXT_ID, {
    properties: { title: [['Child of blank text']] },
  }),
  ...block(TOGGLE_ID, 'toggle', EXTRA_PAGE_ID, {
    properties: { title: [['Toggle title']] },
    content: [TOGGLE_CHILD_ID],
  }),
  ...block(TOGGLE_CHILD_ID, 'text', TOGGLE_ID, {
    properties: { title: [['Toggle body']] },
  }),
  ...block(EQUATION_ID, 'equation', EXTRA_PAGE_ID, {
    properties: { title: [['E=mc^2']] },
  }),
  ...block(NUMBERED_A_ID, 'numbered_list', EXTRA_PAGE_ID, {
    properties: { title: [['First']] },
    content: [NUMBERED_A1_ID],
  }),
  ...block(NUMBERED_A1_ID, 'numbered_list', NUMBERED_A_ID, {
    properties: { title: [['First nested']] },
  }),
  ...block(NUMBERED_B_ID, 'numbered_list', EXTRA_PAGE_ID, {
    properties: { title: [['Second']] },
  }),
  ...block(BULLETED_ID, 'bulleted_list', EXTRA_PAGE_ID, {
    properties: { title: [['Bullet']] },
    content: [BULLETED_CHILD_ID],
  }),
  ...block(BULLETED_CHILD_ID, 'bulleted_list', BULLETED_ID, {
    properties: { title: [['Nested bullet']] },
  }),
  ...block(SYNC_CONTAINER_ID, 'transclusion_container', EXTRA_PAGE_ID, {
    content: [SYNC_CHILD_ID],
  }),
  ...block(SYNC_CHILD_ID, 'text', SYNC_CONTAINER_ID, {
    properties: { title: [['Synced text']] },
  }),
  ...block(SYNC_REFERENCE_ID, 'transclusion_reference', EXTRA_PAGE_ID, {
    format: { transclusion_reference_pointer: { id: SYNC_CONTAINER_ID } },
  }),
  ...block(EMBED_ID, 'embed', EXTRA_PAGE_ID, {
    format: {
      display_source: 'https://example.com/embed',
      block_height: 300,
      block_width: 600,
    },
  }),
  ...block(VIDEO_ID, 'video', EXTRA_PAGE_ID, {
    format: {
      display_source: 'https://example.com/video',
      block_aspect_ratio: 0.5625,
    },
    properties: { caption: [['Video caption']] },
  }),
  ...block(FIGMA_ID, 'figma', EXTRA_PAGE_ID, {
    properties: { source: [['https://figma.com/file/123']] },
    format: { block_aspect_ratio: 0.5 },
  }),
  ...block(CALLOUT_ID, 'callout', EXTRA_PAGE_ID, {
    properties: { title: [['Callout title']] },
    format: { page_icon: '💡', block_color: 'gray_background' },
    content: [CALLOUT_CHILD_ID],
  }),
  ...block(CALLOUT_CHILD_ID, 'text', CALLOUT_ID, {
    properties: { title: [['Callout body']] },
  }),
  ...block(UNKNOWN_ID, 'unsupported_block', EXTRA_PAGE_ID),
  ...block(TABLE_ID, 'table', EXTRA_PAGE_ID, {
    format: {
      table_block_column_order: ['b', 'a'],
      table_block_column_header: true,
      table_block_row_header: true,
    },
    content: [TABLE_ROW_1_ID, TABLE_ROW_2_ID],
  }),
  ...block(TABLE_ROW_1_ID, 'table_row', TABLE_ID, {
    properties: { a: [['A1']], b: [['B1']] },
  }),
  ...block(TABLE_ROW_2_ID, 'table_row', TABLE_ID, {
    properties: { a: [['A2']] },
  }),
});
