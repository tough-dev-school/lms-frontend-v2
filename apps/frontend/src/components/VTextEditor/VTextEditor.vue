<script setup lang="ts">
  import { Editor, EditorContent } from '@tiptap/vue-3';
  import { getExtensions } from '@/utils/tiptap';
  import { marked } from 'marked';
  import {
    IconBold,
    IconH1,
    IconH2,
    IconH3,
    IconItalic,
    IconBlockquote,
    IconListNumbers,
    IconList,
    IconLink,
    IconLinkOff,
    IconPhoto,
    IconTable,
    IconColumnInsertLeft,
    IconColumnInsertRight,
    IconRowInsertTop,
    IconRowInsertBottom,
    IconRowRemove,
    IconColumnRemove,
    IconTableOff,
  } from '@tabler/icons-vue';
  import { onBeforeUnmount, ref, useTemplateRef, watch, computed } from 'vue';
  import { onKeyDown, useKeyModifier, useFocusWithin } from '@vueuse/core';
  import VLoader from '@/components/VLoader/VLoader.vue';
  import { useHomeworkAnswerSendImageMutation } from '@/query';
  import { isEqual } from 'lodash-es';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      legacyText?: string;
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

  const content = defineModel<Record<string, unknown>>({ required: true });

  const contentOrLegacyText = computed({
    get() {
      if (Object.keys(content.value).length === 0 && props.legacyText) {
        return props.legacyText;
      }

      return content.value;
    },
    set(value) {
      content.value = value as Record<string, unknown>;
    },
  });

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
    content: contentOrLegacyText.value,
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

        // Only convert markdown if it actually looks like markdown
        // Otherwise, let TipTap handle HTML paste natively to preserve styles
        if (looksLikeMarkdown) {
          event.preventDefault();
          const htmlFromMarkdown = marked.parse(candidate);
          // Insert converted HTML at current selection
          editor.chain().focus().insertContent(String(htmlFromMarkdown)).run();
          return true;
        }

        // Let TipTap handle styled HTML paste natively
        return false;
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
      content.value = editor.getJSON();
      isEditorEmpty.value = editor.isEmpty;
    },
    onCreate: () => {
      content.value = editor.getJSON();
      isEditorEmpty.value = editor.isEmpty;
    },
  });

  watch(
    () => content.value,
    (newContent) => {
      const isSame = isEqual(editor.getJSON(), newContent);

      if (isSame) return;

      editor.commands.setContent(newContent, { emitUpdate: false });
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

  const isEditorEmpty = ref(true);

  const isEmpty = computed(() => isEditorEmpty.value);

  defineExpose({
    isEmpty,
  });

  onBeforeUnmount(() => {
    editor.destroy();
  });
</script>

<template>
  <div
    ref="currentEditor"
    class="flex min-h-240 flex-col rounded bg-white px-16 dark:bg-darkmode-layer2"
  >
    <div
      v-if="editor"
      class="sticky top-0 z-10 border-b border-lightgray bg-white dark:border-darkmode-border dark:bg-darkmode-layer2 dark:text-white"
    >
      <div class="flex flex-wrap items-center">
        <button
          class="TextEditor__Button"
          :class="{
            TextEditor__Button_Active: editor.isActive('heading', {
              level: 1,
            }),
          }"
          @click="toggleHeading1"
        >
          <IconH1 />
        </button>
        <button
          class="TextEditor__Button"
          :class="{
            TextEditor__Button_Active: editor.isActive('heading', {
              level: 2,
            }),
          }"
          @click="toggleHeading2"
        >
          <IconH2 />
        </button>
        <button
          class="TextEditor__Button"
          :class="{
            TextEditor__Button_Active: editor.isActive('heading', {
              level: 3,
            }),
          }"
          @click="toggleHeading3"
        >
          <IconH3 />
        </button>
        <button
          class="TextEditor__Button"
          :class="{ TextEditor__Button_Active: editor.isActive('bold') }"
          @click="toggleBold"
        >
          <IconBold />
        </button>
        <button
          class="TextEditor__Button"
          :class="{ TextEditor__Button_Active: editor.isActive('italic') }"
          @click="toggleItalic"
        >
          <IconItalic />
        </button>
        <button
          class="TextEditor__Button"
          :class="{ TextEditor__Button_Active: editor.isActive('link') }"
          @click="editLink"
        >
          <IconLink />
        </button>
        <button
          class="TextEditor__Button"
          :disabled="!editor.isActive('link')"
          @click="editor.chain().focus().unsetLink().run()"
        >
          <IconLinkOff />
        </button>
        <button
          class="TextEditor__Button"
          :class="{ TextEditor__Button_Active: editor.isActive('blockquote') }"
          @click="toggleBlockquote"
        >
          <IconBlockquote />
        </button>
        <button
          class="TextEditor__Button"
          :class="{
            TextEditor__Button_Active: editor.isActive('orderedList'),
          }"
          @click="toggleOrderedList"
        >
          <IconListNumbers />
        </button>
        <button
          class="TextEditor__Button"
          :class="{ TextEditor__Button_Active: editor.isActive('bulletList') }"
          @click="toggleUnorderedList"
        >
          <IconList />
        </button>
        <label class="TextEditor__Button">
          <IconPhoto />
          <input
            class="visually-hidden"
            type="file"
            accept="image/*"
            name="image"
            @change="addImage($event)"
        /></label>
        <button
          class="TextEditor__Button"
          :class="{ TextEditor__Button_Active: editor.isActive('table') }"
          @click="insertTable"
        >
          <IconTable />
        </button>
      </div>
      <div
        v-if="editor.isActive('table')"
        class="flex items-center"
      >
        <div>Для таблицы:</div>
        <button
          class="TextEditor__Button"
          @click="addColumnBefore"
        >
          <IconColumnInsertLeft />
        </button>
        <button
          class="TextEditor__Button"
          @click="addColumnAfter"
        >
          <IconColumnInsertRight />
        </button>
        <button
          class="TextEditor__Button"
          @click="deleteColumn"
        >
          <IconColumnRemove />
        </button>
        <div class="w-1 mx-4 h-16 bg-lightgray dark:bg-darkmode-border" />
        <button
          class="TextEditor__Button"
          @click="addRowBefore"
        >
          <IconRowInsertTop />
        </button>
        <button
          class="TextEditor__Button"
          @click="addRowAfter"
        >
          <IconRowInsertBottom />
        </button>
        <button
          class="TextEditor__Button"
          @click="deleteRow"
        >
          <IconRowRemove />
        </button>
        <div class="w-1 mx-4 h-16 bg-lightgray dark:bg-darkmode-border" />
        <button
          class="TextEditor__Button"
          @click="deleteTable"
        >
          <IconTableOff />
        </button>
      </div>
    </div>
    <div
      v-if="isImageLoading"
      class="p-32"
    >
      <VLoader />
    </div>
    <EditorContent
      :editor="editor"
      class="TextEditor__Content prose flex-grow"
      @click="editor.chain().focus().run()"
    />
  </div>
</template>

<style>
  .TextEditor {
    &__Button {
      @apply flex aspect-square items-center justify-center px-8 transition-colors hover:bg-lightgray dark:hover:bg-darkmode-layer3;
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

  .ProseMirror .tableWrapper {
    @apply overflow-x-auto;
  }
</style>
