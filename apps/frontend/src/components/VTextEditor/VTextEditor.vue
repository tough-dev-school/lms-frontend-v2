<script setup lang="ts">
  import Placeholder from '@tiptap/extension-placeholder';
  import { EditorContent, Editor } from '@tiptap/vue-3';
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
  import { onBeforeUnmount, watch, withDefaults, ref } from 'vue';
  import { onKeyDown, useKeyModifier, useFocusWithin } from '@vueuse/core';
  import VLoader from '@/components/VLoader/VLoader.vue';
  import { useHomeworkAnswerSendImageMutation } from '@/query';

  export interface Props {
    modelValue?: string;
    placeholder?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '',
  });

  const currentEditor = ref();
  const isImageLoading = ref(false);
  const { focused } = useFocusWithin(currentEditor);

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    send: [];
  }>();

  const isMetaPressed = useKeyModifier('Meta');

  onKeyDown('Enter', (event) => {
    if (isMetaPressed.value && focused.value) {
      event.preventDefault();
      emit('send');
    }
  });

  const { mutateAsync: sendImage } = useHomeworkAnswerSendImageMutation();

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
          const loaderFieldHeightInPx = 104;

          isImageLoading.value = true;
          const file = event.dataTransfer.files[0];

          // eslint-disable-next-line promise/catch-or-return
          sendImage(file).then(({ image }) => {
            const { schema } = view.state;
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY + loaderFieldHeightInPx,
            });
            if (coordinates) {
              const node = schema.nodes.image.create({ src: image });
              const transaction = view.state.tr.insert(coordinates.pos, node);
              view.dispatch(transaction);
            }
            isImageLoading.value = false;
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
    isImageLoading.value = true;
    if (event.target) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const { image } = await sendImage(file);
        editor.commands.setImage({ src: image });
      }
    }
    isImageLoading.value = false;
  };

  onBeforeUnmount(() => {
    editor.destroy();
  });
</script>

<template>
  <div
    ref="currentEditor"
    class="bg-white dark:bg-darkmode-layer2 px-16 rounded min-h-240 flex flex-col">
    <div
      v-if="editor"
      class="flex items-center dark:text-white border-b border-lightgray dark:border-darkmode-border">
      <button
        class="TextEditor__Button"
        :class="{
          TextEditor__Button_Active: editor.isActive('heading', {
            level: 1,
          }),
        }"
        @click="toggleHeading1">
        <H1Icon />
      </button>
      <button
        class="TextEditor__Button"
        :class="{
          TextEditor__Button_Active: editor.isActive('heading', {
            level: 2,
          }),
        }"
        @click="toggleHeading2">
        <H2Icon />
      </button>
      <button
        class="TextEditor__Button"
        :class="{
          TextEditor__Button_Active: editor.isActive('heading', {
            level: 3,
          }),
        }"
        @click="toggleHeading3">
        <H3Icon />
      </button>
      <button
        class="TextEditor__Button"
        :class="{ TextEditor__Button_Active: editor.isActive('bold') }"
        @click="toggleBold">
        <BoldIcon />
      </button>
      <button
        class="TextEditor__Button"
        :class="{ TextEditor__Button_Active: editor.isActive('italic') }"
        @click="toggleItalic">
        <ItalicIcon />
      </button>
      <button
        class="TextEditor__Button"
        :class="{ TextEditor__Button_Active: editor.isActive('blockquote') }"
        @click="toggleBlockquote">
        <BlockquoteIcon />
      </button>
      <button
        class="TextEditor__Button"
        :class="{
          TextEditor__Button_Active: editor.isActive('orderedList'),
        }"
        @click="toggleOrderedList">
        <ListNumbersIcon />
      </button>
      <button
        class="TextEditor__Button"
        :class="{ TextEditor__Button_Active: editor.isActive('bulletList') }"
        @click="toggleUnorderedList">
        <ListIcon />
      </button>
      <label class="TextEditor__Button">
        <PhotoIcon />
        <input
          class="visually-hidden"
          type="file"
          accept="image/*"
          name="image"
          @change="addImage($event)"
      /></label>
    </div>
    <div v-if="isImageLoading" class="p-32">
      <VLoader />
    </div>
    <EditorContent
      :editor="editor"
      class="TextEditor__Content prose flex-grow"
      @click="editor.chain().focus().run()" />
  </div>
</template>

<style>
  .TextEditor {
    &__Button {
      @apply flex h-32 items-center justify-center px-8 hover:bg-lightgray dark:hover:bg-darkmode-layer3 transition-colors;
      &_Active {
        @apply bg-lightgray dark:bg-darkmode-layer3;
      }
    }
  }

  .ProseMirror {
    @apply prose max-w-none outline-none dark:prose-invert;
  }

  .ProseMirror-focused {
    @apply focus:outline-none;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    @apply pointer-events-none float-left h-0 text-gray;
  }
</style>
