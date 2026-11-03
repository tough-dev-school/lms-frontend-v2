import { toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useEventListener } from '@vueuse/core';

/**
 * This is fucking hack to be able to check checkboxes and save state to localStorage that rendered via NotionRenderer
 */
export const useNotionCheckboxHack = (materialId: MaybeRefOrGetter<string>) => {
  const mapBlockId = (id: string) => `${toValue(materialId)}-${id}}`;

  // Called after every render of a material, because the view is reused when moving between materials
  const restoreCheckboxes = () => {
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
  };

  useEventListener(document, 'change', (event) => {
    const target = event.target as HTMLInputElement | null;
    if (target?.parentElement?.classList.contains('notion-checkbox-wrapper')) {
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

  return { restoreCheckboxes };
};
