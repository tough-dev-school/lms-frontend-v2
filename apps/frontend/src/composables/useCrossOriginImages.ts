import { useMutationObserver } from '@vueuse/core';
import { onMounted } from 'vue';

/** Make all images cross-origin in order to avoid opaque responses that take up too much cache space
 *
 * See https://whatwebcando.today/articles/opaque-responses-service-worker/
 */
export function useCrossOriginImages() {
  if (import.meta.env.DEV) return;

  onMounted(() => {
    useMutationObserver(
      document.querySelector('body'),
      (mutations) => {
        const addedNodes = mutations.flatMap((mutation) => [
          ...mutation.addedNodes,
        ]);
        for (const node of addedNodes) {
          if (node instanceof HTMLElement) {
            const images = node.querySelectorAll('img');
            for (const image of images) {
              image.crossOrigin = 'anonymous';
              // Assume all images come from our CDN which supports HTTPS and CORS.
              image.src = image.src.replace('http:', 'https:');
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
