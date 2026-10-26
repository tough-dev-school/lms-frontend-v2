<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import type { Lesson } from '@/api/generated';
  import { Link } from '@inertiajs/vue3';
  import { useI18n } from 'vue-i18n';
  import { urls } from '@/urls';

  defineProps<{
    material: NonNullable<Lesson['material']>;
  }>();

  const { t } = useI18n();
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

  <Link :href="urls.material(material.id)">
    <VButton class="VLessonCard__Button"> {{ t('lesson.read') }} </VButton>
  </Link>
</template>
