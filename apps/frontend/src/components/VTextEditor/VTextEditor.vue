<script setup lang="ts">
  import { Editor, EditorContent } from '@tiptap/vue-3';
  import { getExtensions } from '@/utils/tiptapExtensions';
  import { marked } from 'marked';
  import {
    BoldIcon,
    H1Icon,
    H2Icon,
    H3Icon,
    ItalicIcon,
    BlockquoteIcon,
    ListNumbersIcon,
    ListIcon,
    LinkIcon,
    LinkOffIcon,
    PhotoIcon,
    TableIcon,
    ColumnInsertLeftIcon,
    ColumnInsertRightIcon,
    RowInsertTopIcon,
    RowInsertBottomIcon,
    MinusIcon,
    TableOffIcon,
  } from 'vue-tabler-icons';
  import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
  import { onKeyDown, useKeyModifier, useFocusWithin } from '@vueuse/core';
  import VLoader from '@/components/VLoader/VLoader.vue';
  import { useHomeworkAnswerSendImageMutation } from '@/query';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
    }>(),
    {
      placeholder: '',
    },
  );

  /**
   * IO of text in LMS is quite complicated:
   *
   * - TipTap takes JSON or HTML as input, but can output JSON, HTML, or Markdown
   * - LMS takes Markdown as input, but can output Markdown or HTML
   * - Users want to use Markdown
   *
   * So what we do:
   * - Inputs
   *   - HTML is used as input for TipTap
   *   - Markdown is used as input for TipTap
   * - Outputs
   *   - HTML produced by tiptap is used to store state in memory
   *   - Markdown produced by tiptap is used to be sent to LMS
   */

  const content = defineModel<string>({ required: true });

  const currentEditor = useTemplateRef('currentEditor');
  const isImageLoading = ref(false);
  const { focused } = useFocusWithin(currentEditor);

  const emit = defineEmits<{
    send: [];
  }>();

  const isMetaPressed = useKeyModifier('Meta');

  onKeyDown('Enter', (event) => {
    if (isMetaPressed.value && focused.value) {
      event.preventDefault();
      emit('send');
    }
  });

  const editLink = () => {
    const previousUrl = (editor.getAttributes('link')?.href as string) || '';
    // eslint-disable-next-line no-alert
    const url = window.prompt('Enter URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  onKeyDown('k', (event) => {
    if (isMetaPressed.value && focused.value) {
      event.preventDefault();
      editLink();
    }
  });

  const { mutateAsync: sendImage } = useHomeworkAnswerSendImageMutation();

  const extensions = getExtensions({ placeholder: props.placeholder });

  const editor = new Editor({
    content: content.value,
    extensions,
    editorProps: {
      handlePaste: (_view, event) => {
        // Handle image paste
        const items = [...(event.clipboardData?.items || [])];
        const imageItem = items.find((item) => item.type.startsWith('image/'));

        if (imageItem) {
          event.preventDefault();
          isImageLoading.value = true;

          const file = imageItem.getAsFile();
          if (file) {
            // Handle image upload in the background
            void sendImage(file)
              .then(({ image }) => {
                editor.commands.setImage({ src: image });
              })
              .catch((error) => {
                console.error('Failed to upload pasted image:', error);
              })
              .finally(() => {
                isImageLoading.value = false;
              });
          } else {
            isImageLoading.value = false;
          }
          return true;
        }

        // Handle markdown paste
        const markdownFromClipboard =
          event.clipboardData?.getData('text/markdown') || '';
        const textFromClipboard =
          event.clipboardData?.getData('text/plain') || '';

        const candidate = markdownFromClipboard || textFromClipboard;
        if (!candidate) return false;

        const looksLikeMarkdown =
          !!markdownFromClipboard ||
          /^(\s{0,3}#{1,6}\s|\*\s|-\s|\d+\.\s|>\s|`{1,3}|!\[|\[.*?]\(.*?\))/m.test(
            candidate,
          );
        if (!looksLikeMarkdown) return false;

        event.preventDefault();
        const htmlFromMarkdown = marked.parse(candidate);
        // Insert converted HTML at current selection
        editor.chain().focus().insertContent(String(htmlFromMarkdown)).run();
        return true;
      },
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
      content.value = editor.getHTML();
    },
  });

  watch(
    () => content.value,
    (newHtml) => {
      const isSame = editor.getHTML() === newHtml;

      if (isSame) return;

      editor.commands.setContent(newHtml, { emitUpdate: false });
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

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
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
      class="sticky top-0 z-10 bg-white dark:bg-darkmode-layer2 flex items-center dark:text-white border-b border-lightgray dark:border-darkmode-border">
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
        :class="{ TextEditor__Button_Active: editor.isActive('link') }"
        @click="editLink">
        <LinkIcon />
      </button>
      <button
        class="TextEditor__Button"
        :disabled="!editor.isActive('link')"
        @click="editor.chain().focus().unsetLink().run()">
        <LinkOffIcon />
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
      <button
        class="TextEditor__Button"
        :class="{ TextEditor__Button_Active: editor.isActive('table') }"
        @click="insertTable">
        <TableIcon />
      </button>
      <template v-if="editor.isActive('table')">
        <div class="mx-4 w-1 h-16 bg-lightgray dark:bg-darkmode-border" />
        <button class="TextEditor__Button" @click="addColumnBefore">
          <ColumnInsertLeftIcon />
        </button>
        <button class="TextEditor__Button" @click="addColumnAfter">
          <ColumnInsertRightIcon />
        </button>
        <button class="TextEditor__Button" @click="deleteColumn">
          <MinusIcon />
        </button>
        <div class="mx-4 w-1 h-16 bg-lightgray dark:bg-darkmode-border" />
        <button class="TextEditor__Button" @click="addRowBefore">
          <RowInsertTopIcon />
        </button>
        <button class="TextEditor__Button" @click="addRowAfter">
          <RowInsertBottomIcon />
        </button>
        <button class="TextEditor__Button" @click="deleteRow">
          <MinusIcon />
        </button>
        <div class="mx-4 w-1 h-16 bg-lightgray dark:bg-darkmode-border" />
        <button class="TextEditor__Button" @click="deleteTable">
          <TableOffIcon />
        </button>
      </template>
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

  .ProseMirror table {
    @apply border border-lightgray dark:border-darkmode-border;
  }

  .ProseMirror th {
    @apply bg-lightgray dark:bg-darkmode-layer3 font-bold p-8;
  }

  .ProseMirror td {
    @apply border border-lightgray dark:border-darkmode-border p-8;
  }
</style>
