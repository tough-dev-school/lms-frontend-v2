import { useStorage } from '@vueuse/core';

export const useEditorAutosave = (key: (string | undefined)[]) => {
  const content = useStorage(key.filter(Boolean).join('-'), {}, localStorage, {
    serializer: {
      read: (v: string) =>
        (v ? JSON.parse(v) : null) as Record<string, unknown>,

      write: (v: object) => JSON.stringify(v),
    },
  });

  return { content };
};
