import type { DOMOutputSpec } from '@tiptap/pm/model';
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
  // StarterKit bundles its own Link, ours below is configured for answers
  StarterKit.configure({ link: false }),
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
  Image.configure({ inline: true }),
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
    renderHTML({ node, HTMLAttributes }): DOMOutputSpec {
      const originalRender = this.parent?.({ node, HTMLAttributes });
      return originalRender
        ? ['div', { class: 'tableWrapper' }, originalRender]
        : ['div', { class: 'tableWrapper' }];
    },
  }),
];

export const getEmptyContent = () => ({
  type: 'doc',
  content: [{ type: 'paragraph' }],
});
