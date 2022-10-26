<script setup>
  import { EditorContent, BubbleMenu, Editor } from '@tiptap/vue-3';
  import StarterKit from '@tiptap/starter-kit';
  import {
    BoldIcon,
    H1Icon,
    H2Icon,
    H3Icon,
    ItalicIcon,
    BlockquoteIcon,
    ListNumbersIcon,
    ListIcon,
  } from 'vue-tabler-icons';
  import { createMarkdownEditor } from 'tiptap-markdown';
  import { defineEmits } from 'vue';

  const MarkdownEditor = createMarkdownEditor(Editor);

  const emit = defineEmits(['update']);

  const editor = new MarkdownEditor({
    content: '',
    extensions: [StarterKit, BubbleMenu],
    onUpdate({ editor }) {
      emit('update', editor.getMarkdown());
    },
  });
</script>

<template>
  <div>
    <EditorContent :editor="editor" class="prose" />
    <BubbleMenu
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
      class="flex rounded bg-white shadow">
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        class="bubble-button">
        <H1Icon />
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        class="bubble-button">
        <H2Icon />
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        class="bubble-button">
        <H3Icon />
      </button>
      <button
        @click="editor.chain().focus().toggleBold().run()"
        class="bubble-button">
        <BoldIcon />
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        class="bubble-button">
        <ItalicIcon />
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        class="bubble-button">
        <BlockquoteIcon />
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        class="bubble-button">
        <ListNumbersIcon />
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        class="bubble-button">
        <ListIcon />
      </button>
    </BubbleMenu>
  </div>
</template>

<style>
  .ProseMirror {
    @apply rounded bg-white py-8 px-16 outline-none;
  }

  .bubble-button {
    @apply inline-flex items-center justify-center px-8  py-[2px] text-gray  transition-colors hover:text-black;
  }

  .bubble-button:first-child {
    @apply pl-16;
  }

  .bubble-button:last-child {
    @apply pr-16;
  }
</style>
