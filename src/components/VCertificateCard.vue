<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VCard from '@/components/VCard.vue';
  import getCertificateLink from '@/utils/getCertificateLink';
  import { Diploma } from '@/types/diplomas';

  interface Props {
    course: string;
    certificates: Diploma[];
  }

  defineProps<Props>();

  const localeLabel = {
    RU: 'На русском',
    EN: 'На английском',
  };
</script>

<template>
  <VCard tag="section" class="grid gap-16">
    <VHeading tag="h2" data-testid="name">Курс «{{ course }}»</VHeading>
    <ul class="grid gap-32 phone:grid-cols-2">
      <li
        v-for="certificate in certificates"
        data-testid="certificate"
        :key="certificate.slug">
        <figure>
          <img
            data-testid="image"
            :src="certificate.image"
            :alt="certificate.course.name" />
          <figcaption class="text-center">
            <div data-testid="label">
              {{ localeLabel[certificate.language] }}
            </div>
          </figcaption>
          <div class="mt-8 flex flex-wrap justify-center gap-x-16 gap-y-8">
            <a
              class="link"
              data-testid="download"
              :href="certificate.image"
              download
              >Скачать</a
            >
            <a
              class="link"
              data-testid="linkedin"
              :href="getCertificateLink(certificate.slug)"
              >Ссылка для LinkedIn</a
            >
          </div>
        </figure>
      </li>
    </ul>
  </VCard>
</template>
