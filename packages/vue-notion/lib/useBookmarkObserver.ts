import { debounce } from 'es-toolkit/compat';
import { nextTick, onBeforeUnmount, onMounted, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

const BOOKMARK_DEBOUNCE_MS = 300;

// Reports the id of the topmost visible block, so the page can restore the
// reading position later. New blocks (e.g. rendered after async content
// loads) are picked up by the MutationObserver.
export const useBookmarkObserver = (
  rootElement: MaybeRefOrGetter<Element | null | undefined>,
  onBookmark: (blockId: string) => void,
) => {
  let observer: IntersectionObserver | null = null;
  let mutationObserver: MutationObserver | null = null;
  let currentBlockId: string | null = null;
  const intersectingBlocks = new Map<Element, number>();
  const emitBookmark = debounce(onBookmark, BOOKMARK_DEBOUNCE_MS);

  const getContainer = () => {
    const element = toValue(rootElement);
    return element instanceof Element ? element.closest('.notion') : null;
  };

  const observeBlocks = () => {
    if (!observer) return;

    const container = getContainer() || document;
    container.querySelectorAll<HTMLElement>('[id]').forEach((block) => {
      if (block.id && block.dataset.observed === undefined) {
        const hasBlockType =
          block.dataset.blockType !== undefined ||
          block.querySelector('[data-block-type]') !== null;
        if (hasBlockType) {
          block.dataset.observed = 'true';
          observer?.observe(block);
        }
      }
    });
  };

  const handleIntersections = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        intersectingBlocks.set(entry.target, entry.boundingClientRect.top);
      } else {
        intersectingBlocks.delete(entry.target);
      }
    });

    let topEntry: Element | null = null;
    let minTop = Infinity;
    intersectingBlocks.forEach((top, target) => {
      if (top < minTop) {
        minTop = top;
        topEntry = target;
      }
    });

    const blockId = (topEntry as Element | null)?.id;
    if (blockId && currentBlockId !== blockId) {
      currentBlockId = blockId;
      emitBookmark(blockId);
    }
  };

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    observer = new IntersectionObserver(handleIntersections, {
      root: null,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    void nextTick(observeBlocks);

    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => nextTick(observeBlocks));
      mutationObserver.observe(getContainer() || document.body, {
        childList: true,
        subtree: true,
      });
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
    mutationObserver?.disconnect();
    mutationObserver = null;
    intersectingBlocks.clear();
    emitBookmark.cancel();
  });
};
