import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import Image from '@tiptap/extension-image';
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '@tiptap/extension-table';

export const getExtensions = ({ placeholder }: { placeholder: string }) => [
  StarterKit.configure({
    link: {
      openOnClick: false,
      autolink: true,
      linkOnPaste: true,
      defaultProtocol: 'https',
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
    renderHTML({ node, HTMLAttributes }) {
      const originalRender = this.parent?.({ node, HTMLAttributes });
      const wrapper = ['div', { class: 'tableWrapper' }, originalRender];
      return wrapper;
    },
  }),
];

export const getEmptyContent = () => ({
  type: 'doc',
  content: [{ type: 'paragraph' }],
});
