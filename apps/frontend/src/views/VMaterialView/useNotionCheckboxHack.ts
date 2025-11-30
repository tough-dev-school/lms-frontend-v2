import { toValue, onMounted } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useEventListener } from '@vueuse/core';

export const useNotionCheckboxHack = (materialId: MaybeRefOrGetter<string>) => {
  const mapBlockId = (id: string) => `${toValue(materialId)}-${id}}`;

  onMounted(() => {
    /**
     * This is fucking hack to be able to check checkboxes and save state to localStorage that rendered via NotionRenderer
     */

    document
      .querySelectorAll<HTMLInputElement>('.notion-checkbox-wrapper input')
      .forEach((checkbox) => {
        // All checkboxes are disabled by default
        checkbox.disabled = false;

        // set checked state from localStorage
        const id = checkbox.parentElement?.parentElement?.id;
        if (id) {
          checkbox.checked = !!localStorage.getItem(mapBlockId(id));
        }
      });

    useEventListener(document, 'change', (event) => {
      const target = event.target as HTMLInputElement | null;
      if (
        target &&
        target.parentElement?.classList.contains('notion-checkbox-wrapper')
      ) {
        // label element id
        const id = target.parentElement.parentElement?.id;
        if (id) {
          // Save state to localStorage
          if (target.checked) {
            localStorage.setItem(mapBlockId(id), '1');
          } else {
            localStorage.removeItem(mapBlockId(id));
          }
        }
      }
    });
  });
};
