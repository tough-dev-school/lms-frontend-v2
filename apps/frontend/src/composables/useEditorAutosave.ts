import { onMounted, ref, watch } from 'vue';
import { getEmptyContent } from '@/utils/tiptap';

// Drafts live in localStorage, which the server doesn't have. Every render starts empty
// and the saved draft is restored after mount, so hydration sees the same markup.
export const useEditorAutosave = (key: (string | undefined)[]) => {
  const storageKey = key.filter(Boolean).join('-');
  // An empty object is not a tiptap document, the editor would warn on every mount
  const content = ref<Record<string, unknown>>(getEmptyContent());
  let isRestored = false;

  const read = () => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return undefined;

    try {
      const draft = JSON.parse(saved) as Record<string, unknown> | null;
      // The previous version of the app saved {} for untouched editors
      return draft && 'type' in draft ? draft : undefined;
    } catch {
      return undefined;
    }
  };

  watch(
    content,
    (value) => {
      // Saving before the restore would overwrite the draft with the empty initial value
      if (!isRestored) return;
      localStorage.setItem(storageKey, JSON.stringify(value));
    },
    { deep: true },
  );

  onMounted(() => {
    const saved = read();
    if (saved) content.value = saved;
    isRestored = true;
  });

  const clear = () => {
    content.value = getEmptyContent();
  };

  return { content, clear };
};
