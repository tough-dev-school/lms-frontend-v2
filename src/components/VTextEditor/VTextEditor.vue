<script setup lang="ts">
  import useHomework from '@/stores/homework';
  import Image from '@tiptap/extension-image';
  import Placeholder from '@tiptap/extension-placeholder';
  import StarterKit from '@tiptap/starter-kit';
  import {
    BubbleMenu,
    Editor,
    EditorContent,
    FloatingMenu,
  } from '@tiptap/vue-3';
  import { onKeyDown, useFocusWithin, useKeyModifier } from '@vueuse/core';
  import { onBeforeUnmount, ref, watch, withDefaults } from 'vue';
  import {
    BlockquoteIcon,
    BoldIcon,
    H1Icon,
    H2Icon,
    H3Icon,
    ItalicIcon,
    ListIcon,
    ListNumbersIcon,
    PhotoIcon,
  } from 'vue-tabler-icons';

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
    send: [];
    'update:modelValue': [value: string];
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
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: props.placeholder,
      }),
      Image.configure({ inline: true }),
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
  <div class="bg-white dark:bg-dark-gray" ref="currentEditor">
    <FloatingMenu
      class="float-menu"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor">
      <button
        @click="toggleHeading1"
        class="float-button"
        :class="{
          'float-button_active': editor.isActive('heading', { level: 1 }),
        }">
        <H1Icon />
      </button>
      <button
        @click="toggleHeading2"
        class="float-button"
        :class="{
          'float-button_active': editor.isActive('heading', { level: 2 }),
        }">
        <H2Icon />
      </button>
      <button
        @click="toggleHeading3"
        class="float-button"
        :class="{
          'float-button_active': editor.isActive('heading', { level: 3 }),
        }">
        <H3Icon />
      </button>
      <button
        @click="toggleBlockquote"
        class="float-button"
        :class="{ 'float-button_active': editor.isActive('blockquote') }">
        <BlockquoteIcon />
      </button>
      <button
        @click="toggleOrderedList"
        class="float-button"
        :class="{ 'float-button_active': editor.isActive('orderedList') }">
        <ListNumbersIcon />
      </button>
      <button
        @click="toggleUnorderedList"
        class="float-button"
        :class="{ 'float-button_active': editor.isActive('bulletList') }">
        <ListIcon />
      </button>
      <label class="float-button">
        <PhotoIcon />
        <input
          class="visually-hidden"
          type="file"
          @change="addImage($event)"
          accept="image/*"
          name="image"
      /></label>
    </FloatingMenu>
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
    </BubbleMenu>
    <EditorContent :editor="editor" class="EditorContent" />
  </div>
</template>

<style>
  .bubble-menu,
  .float-menu {
    @apply flex rounded;
  }

  .bubble-menu {
    @apply bg-black text-white;
  }

  .bubble-button,
  .float-button {
    @apply flex h-32 items-center justify-center px-8 first:pl-16 last:pr-16 hover:bg-white hover:bg-opacity-20;
  }

  .bubble-button_active {
    @apply bg-white bg-opacity-20;
  }

  .float-menu {
    @apply bg-white text-black;
  }

  .ProseMirror {
    @apply prose max-w-none rounded bg-white py-24 px-16 outline-none dark:prose-invert dark:bg-dark-gray tablet:px-32;
  }

  .ProseMirror-focused {
    @apply focus:outline-none;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    @apply pointer-events-none float-left h-0 text-gray;
  }
</style>
