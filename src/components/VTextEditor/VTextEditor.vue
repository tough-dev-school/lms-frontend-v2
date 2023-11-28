<script setup lang="ts">
  import Placeholder from '@tiptap/extension-placeholder';
  import {
    BubbleMenu,
    EditorContent,
    Editor,
    FloatingMenu,
  } from '@tiptap/vue-3';
  import StarterKit from '@tiptap/starter-kit';
  import Image from '@tiptap/extension-image';
  import {
    BoldIcon,
    H1Icon,
    H2Icon,
    H3Icon,
    ItalicIcon,
    BlockquoteIcon,
    ListNumbersIcon,
    ListIcon,
    PhotoIcon,
  } from 'vue-tabler-icons';
  import useHomework from '@/stores/homework';
  import { onBeforeUnmount, watch, withDefaults, ref } from 'vue';
  import { onKeyDown, useKeyModifier, useFocusWithin } from '@vueuse/core';

  export interface Props {
    modelValue: string;
    placeholder?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '',
  });

  const currentEditor = ref();
  const { focused } = useFocusWithin(currentEditor);

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    send: [];
  }>();

  const isMetaPressed = useKeyModifier('Meta');

  onKeyDown('Enter', (e) => {
    if (isMetaPressed.value && focused.value) {
      e.preventDefault();
      emit('send');
    }
  });

  const homework = useHomework();

  const editor = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: props.placeholder,
      }),
      Image.configure({ inline: true }),
    ],
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          const file = event.dataTransfer.files[0];

          homework.sendImage(file).then(({ image }) => {
            const { schema } = view.state;
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });
            if (coordinates) {
              const node = schema.nodes.image.create({ src: image });
              const transaction = view.state.tr.insert(coordinates.pos, node);
              view.dispatch(transaction);
            }
          });

          return true;
        }
        return false;
      },
    },
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

  const addImage = async (event: Event) => {
    if (event.target) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const { image } = await homework.sendImage(file);
        editor.commands.setImage({ src: image });
      }
    }
  };

  onBeforeUnmount(() => {
    editor.destroy();
  });
</script>

<template>
  <div ref="currentEditor">
    <FloatingMenu
      v-if="editor"
      class="float-menu"
      :editor="editor"
      :tippy-options="{ duration: 100 }">
      <button
        class="float-button"
        :class="{
          'float-button_active': editor.isActive('heading', { level: 1 }),
        }"
        @click="toggleHeading1">
        <H1Icon />
      </button>
      <button
        class="float-button"
        :class="{
          'float-button_active': editor.isActive('heading', { level: 2 }),
        }"
        @click="toggleHeading2">
        <H2Icon />
      </button>
      <button
        class="float-button"
        :class="{
          'float-button_active': editor.isActive('heading', { level: 3 }),
        }"
        @click="toggleHeading3">
        <H3Icon />
      </button>
      <button
        class="float-button"
        :class="{ 'float-button_active': editor.isActive('blockquote') }"
        @click="toggleBlockquote">
        <BlockquoteIcon />
      </button>
      <button
        class="float-button"
        :class="{ 'float-button_active': editor.isActive('orderedList') }"
        @click="toggleOrderedList">
        <ListNumbersIcon />
      </button>
      <button
        class="float-button"
        :class="{ 'float-button_active': editor.isActive('bulletList') }"
        @click="toggleUnorderedList">
        <ListIcon />
      </button>
      <label class="float-button">
        <PhotoIcon />
        <input
          class="visually-hidden"
          type="file"
          accept="image/*"
          name="image"
          @change="addImage($event)"
      /></label>
    </FloatingMenu>
    <BubbleMenu
      v-if="editor"
      class="bubble-menu"
      :editor="editor"
      :tippy-options="{ duration: 100 }">
      <button
        class="bubble-button"
        :class="{ 'bubble-button_active': editor.isActive('bold') }"
        @click="toggleBold">
        <BoldIcon />
      </button>
      <button
        class="bubble-button"
        :class="{ 'bubble-button_active': editor.isActive('italic') }"
        @click="toggleItalic">
        <ItalicIcon />
      </button>
    </BubbleMenu>
    <EditorContent :editor="editor" class="EditorContent" />
  </div>
</template>

<style>
  .bubble-menu,
  .float-menu {
    @apply flex rounded-8;
  }

  .bubble-menu,
  .float-menu {
    @apply bg-black text-white;
    @apply dark:bg-darkmode-white dark:text-darkmode-border;
  }

  .bubble-button,
  .float-button {
    @apply rounded-8 flex h-32 items-center justify-center px-8 hover:bg-white hover:bg-opacity-20;
  }

  .bubble-button_active {
    @apply bg-white bg-opacity-20;
  }

  .ProseMirror {
    @apply prose max-w-none rounded py-24 px-16 outline-none   tablet:px-32;
  }

  .ProseMirror-focused {
    @apply focus:outline-none;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    @apply pointer-events-none float-left h-0 text-gray;
  }
</style>
