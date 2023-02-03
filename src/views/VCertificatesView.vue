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

  const getLocaleName = (localeCode: string) => {
    switch (localeCode) {
      case 'RU':
        return 'На русском';
      case 'EN':
        return 'На английском';
      default:
        return localeCode;
    }
  };
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
        <ul class="grid gap-32 phone:grid-cols-2">
          <li v-for="certificate in group.diplomas" :key="certificate.slug">
            <figure>
              <img :src="certificate.image" :alt="certificate.course.name" />
              <figcaption class="text-center">
                <div>
                  {{ getLocaleName(certificate.language) }}
                </div>
              </figcaption>
              <div class="mt-8 flex flex-wrap justify-center gap-x-16 gap-y-8">
                <a class="link" :href="certificate.image" download>Скачать</a>
                <a
                  class="link"
                  :href="`https://cert.tough-dev.school/${certificate.slug}/en`"
                  >Ссылка для LinkedIn</a
                >
              </div>
            </figure>
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
