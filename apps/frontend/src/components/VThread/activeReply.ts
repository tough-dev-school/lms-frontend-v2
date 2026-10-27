import { inject, provide, ref } from 'vue';
import type { InjectionKey, Ref } from 'vue';

// Slug of the answer whose reply form is open. Shared across the page so the
// page can hide its own comment form while someone replies inside a thread
const activeReplyKey: InjectionKey<Ref<string | null>> = Symbol('activeReply');

export const provideActiveReply = () => {
  const activeReply = ref<string | null>(null);
  provide(activeReplyKey, activeReply);
  return activeReply;
};

// Fallback keeps VThread usable without a provider, e.g. in stories
export const useActiveReply = () =>
  inject(activeReplyKey, () => ref<string | null>(null), true);
