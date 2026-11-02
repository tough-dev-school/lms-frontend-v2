import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { useLmsLessonsList } from '@/api/generated';
import type { Lesson } from '@/api/generated';

interface LessonPage {
  // Material id or question slug, the same value the page has in its URL
  pageId: string;
  to: RouteLocationRaw;
}

// Same priority as VLessonCard. Calls have no page of their own, so arrows skip them
const getLessonPage = (lesson: Lesson): LessonPage | undefined => {
  if (lesson.call) return undefined;
  if (lesson.material) {
    return {
      pageId: lesson.material.id,
      to: { name: 'materials', params: { materialId: lesson.material.id } },
    };
  }
  if (lesson.question) {
    return {
      pageId: lesson.question.slug,
      to: { name: 'homework', params: { questionId: lesson.question.slug } },
    };
  }
  return undefined;
};

export const useLessonNavigation = ({
  moduleId,
  pageId,
}: {
  moduleId: MaybeRefOrGetter<number | undefined>;
  pageId: MaybeRefOrGetter<string>;
}) => {
  // Same query as module page, so it is usually already cached
  const { data: lessonsData } = useLmsLessonsList(
    computed(() => ({ module: toValue(moduleId), page_size: 1000 })),
    { query: { enabled: () => toValue(moduleId) !== undefined } },
  );

  const lessonPages = computed(() =>
    (lessonsData.value?.results ?? []).flatMap((lesson) => {
      const page = getLessonPage(lesson);
      return page ? [page] : [];
    }),
  );

  const currentIndex = computed(() =>
    lessonPages.value.findIndex((page) => page.pageId === toValue(pageId)),
  );

  const previousTo = computed(() => {
    if (currentIndex.value < 1) return undefined;
    return lessonPages.value[currentIndex.value - 1].to;
  });

  const nextTo = computed(() => {
    if (currentIndex.value === -1) return undefined;
    return lessonPages.value[currentIndex.value + 1]?.to;
  });

  return { previousTo, nextTo };
};
