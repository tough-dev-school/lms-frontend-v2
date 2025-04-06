<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { ref, onMounted } from 'vue';
  import { getLessons } from '@/api/lms';
  import type { Lesson } from '@/types/lms';
  import { RouterLink, useRoute } from 'vue-router';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';

  const route = useRoute();
  const moduleId = Number(route.params.moduleId);
  const lessons = ref<Lesson[]>([]);

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
    <div class="flex items-center gap-16 mb-32">
      <RouterLink :to="{ name: 'modules' }" class="link">
        ← Назад к модулям
      </RouterLink>
      <VHeading tag="h1">Все уроки</VHeading>
    </div>

    <div v-if="lessons.length > 0" class="grid gap-24">
      <VCard v-for="lesson in lessons" :key="lesson.id">
        <VHeading tag="h2" class="mb-8">{{ lesson.name }}</VHeading>

        <pre>{{ JSON.stringify(lesson, null, 2) }}</pre>

        <div v-if="lesson.material" class="mt-16">
          <h3 class="text-lg font-semibold mb-2">Материалы</h3>
          <RouterLink
            :to="{
              name: 'materials',
              params: { id: lesson.material.id },
            }"
            class="link">
            {{ lesson.material.title }}
          </RouterLink>
        </div>

        <!-- Render homework info -->
        <div v-if="lesson.homework" class="mt-16">
          <h3 class="text-lg font-semibold mb-2">Домашнее задание</h3>
          <RouterLink
            :to="{
              name: 'homework-question',
              params: { questionId: lesson.homework.question.slug },
            }"
            class="link">
            {{ lesson.homework.question.name }}
          </RouterLink>
          <p class="mt-2">Дедлайн: {{ lesson.homework.question.deadline }}</p>
        </div>
      </VCard>
    </div>

    <p v-else data-testid="empty" class="mb-16 text-center">
      Нет доступных уроков.
    </p>
  </div>
</template>
