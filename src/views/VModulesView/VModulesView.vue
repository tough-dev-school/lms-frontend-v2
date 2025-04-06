<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import { ref, onMounted } from 'vue';
  import { getModules } from '@/api/lms';
  import type { Module } from '@/types/lms';
  import { RouterLink, useRoute } from 'vue-router';

  const modules = ref<Module[]>([]);

  const route = useRoute();

  onMounted(async () => {
    const courseId = route.params.courseId.toString();

    modules.value = await getModules({ courseId: parseInt(courseId) });
  });
</script>

<template>
  <VHeading tag="h1" class="mb-32">Модули</VHeading>

  <div v-if="modules.length > 0" class="grid gap-16">
    <RouterLink
      v-for="module in modules"
      :key="module.id"
      :to="{ name: 'lessons', params: { moduleId: module.id } }"
      class="link">
      <VCard class="relative">
        <VHeading tag="h2">{{ module.name }}</VHeading>
        <pre>{{ JSON.stringify(module, null, 2) }}</pre>
      </VCard>
    </RouterLink>
  </div>

  <p v-else data-testid="empty" class="mb-16 text-center">
    Нет доступных модулей.
  </p>
</template>
