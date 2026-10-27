import { generateHTML, generateJSON, getSchema } from '@tiptap/vue-3';
import type { Extensions } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '@tiptap/extension-table';

export const getExtensions = ({ placeholder }: { placeholder: string }) => [
  StarterKit,
  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
    defaultProtocol: 'https',
    HTMLAttributes: {
      target: '_blank',
    },
  }),
  Placeholder.configure({
    placeholder,
  }),
  // Block images, because inline ones get dropped in the middle of a paragraph and split it
  Image.configure({ inline: false }),
  TableCell,
  TableHeader,
  TableRow,
  // https://github.com/ueberdosis/tiptap/issues/4872#issuecomment-2717554498
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'border-collapse table-auto w-full',
    },
  }).extend({
    renderHTML({ node, HTMLAttributes }) {
      const originalRender = this.parent?.({ node, HTMLAttributes });
      const wrapper = ['div', { class: 'tableWrapper' }, originalRender];
      return wrapper;
    },
  }),
];

/**
 * Answers saved while images were inline keep images inside paragraphs, which
 * the current schema forbids. Reparsing them through HTML lifts images out
 * into their own blocks and keeps the surrounding text.
 */
export const normalizeContent = (
  content: Record<string, unknown>,
  extensions: Extensions,
) => {
  const schema = getSchema(extensions);

  try {
    schema.nodeFromJSON(content).check();
    return content;
  } catch {
    return generateJSON(generateHTML(content, extensions), extensions);
  }
};

export const getEmptyContent = () => ({
  type: 'doc',
  content: [{ type: 'paragraph' }],
});
