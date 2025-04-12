<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { ref, onMounted } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useModulesQuery } from '@/query';

  const route = useRoute();
  const courseId = ref<number>(0);

  const { data: modules } = useModulesQuery(() =>
    parseInt(route.params.courseId.toString()),
  );

  onMounted(async () => {
    courseId.value = parseInt(route.params.courseId.toString());
  });

  const breadcrumbs: Breadcrumb[] = [
    { name: 'Главная', to: { name: 'home' } },
    { name: 'COURSENAME' },
  ];

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
  <VHeading tag="h1" class="mb-32">Модули</VHeading>

  <div v-if="modules && modules.length > 0" class="grid gap-16">
    <RouterLink
      v-for="(module, index) in [
        modules,
        modules,
        modules,
        modules,
        modules,
        modules,
        modules,
        modules,
      ].flat()"
      :key="module.id"
      :to="{ name: 'lessons', params: { moduleId: module.id } }">
      <VCard :class="[cardClass(index), 'text-black']">
        <VHeading tag="h2">{{ module.name }}</VHeading>
      </VCard>
    </RouterLink>
  </div>

  <p v-else data-testid="empty" class="mb-16 text-center">
    Нет доступных модулей.
  </p>
</template>
