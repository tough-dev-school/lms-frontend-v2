<script lang="ts" setup>
  import useDiplomas from '@/stores/diplomas';
  import VHeading from '@/components/VHeading.vue';
  import VCard from '@/components/VCard.vue';
  import { computed } from 'vue';
  import groupBy from 'lodash/groupBy';

  const diplomas = useDiplomas();

  const groupedDiplomas = computed(() => {
    const gorups = groupBy(diplomas.items, (diploma) => diploma.course.name);

    return Object.keys(gorups).map((key) => ({
      course: key,
      diplomas: gorups[key],
    }));
  });
</script>

<template>
  <main class="grid gap-24">
    <VHeading tag="h1">Мои сертификаты</VHeading>

    <div class="grid gap-24">
      <VCard
        tag="section"
        class="grid gap-16"
        v-for="group in groupedDiplomas"
        :key="group.course">
        <VHeading tag="h2">Курс «{{ group.course }}»</VHeading>
        <ul class="grid grid-cols-2 gap-32">
          <li v-for="certificate in group.diplomas" :key="certificate.slug">
            <a :href="certificate.image" class="group" download>
              <img :src="certificate.image" :alt="certificate.course.name" />
              <p class="group-link py-8 text-center">Скачать</p>
            </a>
          </li>
        </ul>
      </VCard>
      <li
        v-if="groupedDiplomas.length === 0"
        class="flex h-128 flex-grow items-center justify-center rounded border border-dashed border-gray text-center text-gray">
        Нет сертификатов
      </li>
    </div>
  </main>
</template>
