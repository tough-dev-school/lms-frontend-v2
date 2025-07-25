import { useMutationObserver } from '@vueuse/core';
import { onMounted } from 'vue';

/** Make all images cross-origin in order to avoid opaque responses that take up too much cache space
 *
 * See https://whatwebcando.today/articles/opaque-responses-service-worker/
 */
export function useCrossOriginImages() {
  onMounted(() => {
    useMutationObserver(
      document.querySelector('body'),
      (mutations) => {
        const addedNodes = mutations.flatMap((mutation) =>
          [...mutation.addedNodes],
        );
        for (const node of addedNodes) {
          if (node instanceof HTMLElement) {
            const images = node.querySelectorAll('img');
            for (const image of images) {
              image.crossOrigin = 'anonymous';
            }
          }
        }
      },
      {
        childList: true,
        subtree: true,
      },
    );
  });
}
