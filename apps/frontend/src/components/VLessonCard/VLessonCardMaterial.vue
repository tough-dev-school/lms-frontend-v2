<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import type { Lesson } from '@/api';

  defineProps<{
    material: NonNullable<Lesson['material']>;
  }>();
</script>

<template>
  <div class="flex flex-col gap-16">
    <VHeading
      tag="h3"
      class="mb-8"
    >
      {{ material.title }}
    </VHeading>
  </div>

  <div class="flex-grow"></div>

  <RouterLink
    :to="{
      name: 'materials',
      params: { materialId: material.id },
    }"
  >
    <VButton class="VLessonCard__Button"> Читать </VButton>
  </RouterLink>
</template>
