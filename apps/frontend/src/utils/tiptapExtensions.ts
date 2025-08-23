import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import Image from '@tiptap/extension-image';
// import type { Extension } from '@tiptap/vue-3';

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
];
