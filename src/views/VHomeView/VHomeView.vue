<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VCover from '@/components/VCover/VCover.vue';
  import useStudies from '@/stores/studies';
  import type { Lesson, Module } from '@/types/lms';
  import { getLessons, getModules } from '@/api/lms';
  import { ref, onMounted } from 'vue';

  const studies = useStudies();

  const lessons = ref<Lesson[]>([]);
  const modules = ref<Module[]>([]);

  onMounted(async () => {
    lessons.value = await getLessons({ moduleId: 54 });
    modules.value = await getModules({ courseId: 45 });
  });
</script>

<template>
  <VHeading tag="h1" class="mb-32">Ваши курсы</VHeading>
  <VCard>
    <VHeading tag="h2">Модули</VHeading>
    <pre>{{ JSON.stringify(modules, null, 2) }}</pre>
  </VCard>

  <VCard>
    <VHeading tag="h2">Уроки</VHeading>
    <pre>{{ JSON.stringify(lessons, null, 2) }}</pre>
  </VCard>

  <ul v-if="studies.items.length > 0" class="mb-32 flex flex-col gap-16">
    <li v-for="(study, index) in studies.items" :key="index">
      <pre>{{ JSON.stringify(study, null, 2) }}</pre>
      <RouterLink
        class="link"
        data-testid="study"
        :to="{
          name: 'materials',
          params: { id: study.homePageSlug },
        }">
        <VCard class="relative !p-0 !px-0">
          <VCover
            :name="study.name"
            :image="study.cover"
            class="hidden phone:flex" />
          <p class="p-16">{{ study.name }}</p>
        </VCard>
      </RouterLink>
    </li>
  </ul>
  <p v-else data-testid="empty" class="mb-16 text-center">
    Нет доступных курсов.
  </p>
  <p class="text-center">
    Доступ к курсам можно купить на
    <a href="https://education.borshev.com/" class="link"
      >education.borshev.com</a
    >.
  </p>
</template>
