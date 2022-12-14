<script setup lang="ts">
  import Placeholder from '@tiptap/extension-placeholder';
  import { BubbleMenu, EditorContent, Editor } from '@tiptap/vue-3';
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
    placeholder?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const editor = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: props.placeholder,
      }),
    ],
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

  const focus = () => {
    editor.chain().focus();
  };

  onBeforeUnmount(() => {
    editor.destroy();
  });
</script>

<template>
  <div class="bg-white dark:bg-dark-gray">
    <BubbleMenu
      class="bubble-menu"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor">
      <button
        @click="toggleBold"
        class="bubble-button"
        :class="{ 'bubble-button_active': editor.isActive('bold') }">
        <BoldIcon />
      </button>
      <button
        @click="toggleItalic"
        class="bubble-button"
        :class="{ 'bubble-button_active': editor.isActive('italic') }">
        <ItalicIcon />
      </button>
      <button
        @click="toggleHeading1"
        class="bubble-button"
        :class="{
          'bubble-button_active': editor.isActive('heading', { level: 1 }),
        }">
        <H1Icon />
      </button>
      <button
        @click="toggleHeading2"
        class="bubble-button"
        :class="{
          'bubble-button_active': editor.isActive('heading', { level: 2 }),
        }">
        <H2Icon />
      </button>
      <button
        @click="toggleHeading3"
        class="bubble-button"
        :class="{
          'bubble-button_active': editor.isActive('heading', { level: 3 }),
        }">
        <H3Icon />
      </button>
      <button
        @click="toggleBlockquote"
        class="bubble-button"
        :class="{ 'bubble-button_active': editor.isActive('blockquote') }">
        <BlockquoteIcon />
      </button>
      <button
        @click="toggleOrderedList"
        class="bubble-button"
        :class="{ 'bubble-button_active': editor.isActive('orderedList') }">
        <ListNumbersIcon />
      </button>
      <button
        @click="toggleUnorderedList"
        class="bubble-button"
        :class="{ 'bubble-button_active': editor.isActive('bulletList') }">
        <ListIcon />
      </button>
    </BubbleMenu>
    <EditorContent
      :editor="editor"
      class="prose max-w-none py-24 dark:prose-invert"
      @click="focus" />
  </div>
</template>

<style>
  .bubble-menu {
    @apply flex rounded bg-black text-white;
  }

  .bubble-button {
    @apply flex h-32 items-center justify-center px-8 first:pl-16 last:pr-16 hover:bg-white hover:bg-opacity-20;
  }

  .bubble-button_active {
    @apply bg-white bg-opacity-20;
  }

  .ProseMirror {
    @apply rounded bg-white py-8 px-16 outline-none dark:bg-dark-gray;
  }

  .ProseMirror-focused {
    @apply focus:outline-none;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    @apply pointer-events-none float-left h-0 text-gray;
  }
</style>
