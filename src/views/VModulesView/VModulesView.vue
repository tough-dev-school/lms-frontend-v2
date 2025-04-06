<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { ref, onMounted } from 'vue';
  import { getModules } from '@/api/lms';
  import type { Module } from '@/types/lms';
  import { RouterLink, useRoute } from 'vue-router';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';

  const modules = ref<Module[]>([]);
  const route = useRoute();
  const courseId = ref<number>(0);

  onMounted(async () => {
    courseId.value = parseInt(route.params.courseId.toString());
    modules.value = await getModules({ courseId: courseId.value });
  });

  const breadcrumbs: Breadcrumb[] = [
    { name: 'Главная', to: { name: 'home' } },
    { name: 'COURSENAME' },
  ];
</script>

<template>
  <VBreadcrumbs :items="breadcrumbs" />
  <VHeading tag="h1" class="mb-32">Модули</VHeading>

  <div v-if="modules.length > 0" class="grid gap-16">
    <RouterLink
      v-for="module in modules"
      :key="module.id"
      :to="{ name: 'lessons', params: { moduleId: module.id } }">
      <VCard>
        <VHeading tag="h2">{{ module.name }}</VHeading>
        <pre>{{ JSON.stringify(module, null, 2) }}</pre>
      </VCard>
    </RouterLink>
  </div>

  <p v-else data-testid="empty" class="mb-16 text-center">
    Нет доступных модулей.
  </p>
</template>
