import { nextTick, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';

// After a comment is posted the server redirects back with the new slug in flash data
export const useScrollToCreatedAnswer = () => {
  const page = usePage();

  watch(
    () => page.flash.createdAnswer,
    async (slug) => {
      if (typeof slug !== 'string') return;

      await nextTick();
      // Keeps the link to the comment shareable, like the hash navigation did before
      history.replaceState(history.state, '', `#${slug}`);
      document
        .querySelector(`[id="${CSS.escape(slug)}"]`)
        ?.scrollIntoView({ behavior: 'smooth' });
    },
    { immediate: true },
  );
};
