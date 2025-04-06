<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { onMounted } from 'vue';
  import { getLessons } from '@/api/lms';
  import { useRoute } from 'vue-router';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useLessonsQuery } from '@/query';

  const route = useRoute();
  const moduleId = Number(route.params.moduleId);

  const { data: lessons } = useLessonsQuery(moduleId);

  onMounted(async () => {
    lessons.value = await getLessons({ moduleId });
  });

  const breadcrumbs: Breadcrumb[] = [
    { name: 'Мои курсы', to: { name: 'home' } },
    { name: 'COURSENAME', to: { name: 'modules' } },
    { name: 'LESSONNAME' },
  ];
</script>

<template>
  <VBreadcrumbs :items="breadcrumbs" />
  <div>
    <VHeading tag="h1">Все уроки</VHeading>
    <div v-if="lessons && lessons.length > 0" class="grid gap-24">
      <VCard v-for="lesson in lessons" :key="lesson.id">
        <VHeading tag="h2" class="mb-8">{{ lesson.name }}</VHeading>

        <pre>{{ JSON.stringify(lesson, null, 2) }}</pre>
      </VCard>
    </div>
    <p v-else data-testid="empty" class="mb-16 text-center">
      Нет доступных уроков.
    </p>
  </div>
</template>
