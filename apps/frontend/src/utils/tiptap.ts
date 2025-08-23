import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import Image from '@tiptap/extension-image';
import { TableKit } from '@tiptap/extension-table';

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
  TableKit.configure({
    table: {
      resizable: true, // this is important to get tableWrapper
      HTMLAttributes: {
        class: 'border-collapse table-auto w-full',
      },
    },
  }),
];

export const getEmptyContent = () => ({
  type: 'doc',
  content: [{ type: 'paragraph' }],
});
