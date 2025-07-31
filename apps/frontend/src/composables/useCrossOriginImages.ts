import { useMutationObserver } from '@vueuse/core';
import { onBeforeMount } from 'vue';

/** Make all images cross-origin in order to avoid opaque responses that take up too much cache space
 *
 * See https://whatwebcando.today/articles/opaque-responses-service-worker/
 */
export function useCrossOriginImages() {
  if (import.meta.env.DEV) return;

  const enableCrossOriginImages = (root: HTMLElement) => {
    const images = root.querySelectorAll('img');

    for (const image of images) {
      image.crossOrigin = 'anonymous';
      // Assume all images come from our CDN which supports HTTPS and CORS.
      const src = image.src.replace('http:', 'https:');
      // Src should come after crossorigin: https://github.com/vuejs/core/issues/4680
      image.removeAttribute('src');
      image.src = src;
    }
  };

  onBeforeMount(() =>
    useMutationObserver(
      document.querySelector('body'),
      (mutations) => {
        const addedNodes = mutations.flatMap((mutation) => [
          ...mutation.addedNodes,
        ]);
        for (const node of addedNodes) {
          if (node instanceof HTMLElement) {
            enableCrossOriginImages(node);
          }
        }
      },
      {
        childList: true,
        subtree: true,
      },
    ),
  );
}
