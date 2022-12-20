<script setup lang="ts">
  import { EditorContent, Editor } from '@tiptap/vue-3';
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
  import { onBeforeUnmount, watch, withDefaults } from 'vue';

  export interface Props {
    modelValue: string;
  }

  const props = withDefaults(defineProps<Props>(), { modelValue: '' });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const editor = new Editor({
    content: props.modelValue,
    extensions: [StarterKit],
    onUpdate: () => {
      const html = editor.getHTML();
      emit('update:modelValue', html);
    },
  });

  watch(
    props,
    (props) => {
      const { modelValue } = props;
      const isSame = editor.getHTML() === modelValue;

      if (isSame) return;

      editor.commands.setContent(modelValue, false);
    },
    { deep: true },
  );

  const toggleHeading1 = () => {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  };

  const toggleHeading2 = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  const toggleHeading3 = () => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  };

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const toggleBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };

  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const toggleUnorderedList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  onBeforeUnmount(() => {
    editor.destroy();
  });
</script>

<template>
  <div class="bg-white">
    <header class="flex">
      <button @click="toggleHeading1" class="bubble-button">
        <H1Icon />
      </button>
      <button @click="toggleHeading2" class="bubble-button">
        <H2Icon />
      </button>
      <button @click="toggleHeading3" class="bubble-button">
        <H3Icon />
      </button>
      <button @click="toggleBold" class="bubble-button">
        <BoldIcon />
      </button>
      <button @click="toggleItalic" class="bubble-button">
        <ItalicIcon />
      </button>
      <button @click="toggleBlockquote" class="bubble-button">
        <BlockquoteIcon />
      </button>
      <button @click="toggleOrderedList" class="bubble-button">
        <ListNumbersIcon />
      </button>
      <button @click="toggleUnorderedList" class="bubble-button">
        <ListIcon />
      </button>
    </header>
    <EditorContent :editor="editor" class="prose max-w-none" />
  </div>
</template>

<style>
  .ProseMirror {
    @apply rounded bg-white py-8 px-16 outline-none;
  }

  .ProseMirror-focused {
    @apply focus:outline-none;
  }

  .bubble-button {
    @apply inline-flex flex-grow items-center justify-center py-4 text-gray transition-colors hover:bg-offwhite hover:bg-opacity-75 hover:text-black;
  }
</style>
