<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { ref, onBeforeMount, computed } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useModulesQuery } from '@/query';
  import useStudies from '@/stores/studies';

  const route = useRoute();
  const courseId = ref<number>(0);

  const { getStudyById } = useStudies();

  const courseName = computed(() => getStudyById(courseId.value)?.name);

  const { data: modules } = useModulesQuery(() =>
    parseInt(route.params.courseId.toString()),
  );

  onBeforeMount(async () => {
    courseId.value = parseInt(route.params.courseId.toString());
  });

  const breadcrumbs = computed<Breadcrumb[]>(() => [
    { name: 'Главная', to: { name: 'home' } },
    { name: courseName.value ? courseName.value : 'Материалы курса' },
  ]);

  const cardClass = (number: number) => {
    // Sadly, Tailwind will strip dynamic classes, so we need to do this manually
    const colors = [
      '!bg-accent-yellow dark:!bg-accent-yellow',
      '!bg-accent-orange dark:!bg-accent-orange',
      '!bg-accent-green dark:!bg-accent-green',
      '!bg-accent-blue dark:!bg-accent-blue',
    ];

    return colors[number % colors.length];
  };
</script>

<template>
  <VBreadcrumbs :items="breadcrumbs" />
  <VHeading tag="h1" class="mb-32">{{ courseName }}</VHeading>
  <div
    v-if="modules && modules.length > 0"
    class="grid gap-16 tablet:gap-32 phone:gap-24">
    <RouterLink
      v-for="(module, index) in modules"
      :key="module.id"
      :to="{ name: 'lessons', params: { moduleId: module.id } }">
      <VCard :class="[cardClass(index), 'text-black min-h-120']">
        <VHeading tag="h2">{{ module.name }}</VHeading>
      </VCard>
    </RouterLink>
  </div>

  <p v-else data-testid="empty" class="mb-16 text-center">
    Нет доступных модулей.
  </p>
</template>
