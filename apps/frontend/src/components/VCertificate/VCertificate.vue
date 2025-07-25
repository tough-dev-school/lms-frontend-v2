<script lang="ts" setup>
  import getCertificateLink from '@/utils/getCertificateLink';
  import type { Diploma } from '@/api/generated-api';

  export interface Props {
    certificate: Diploma;
  }

  defineProps<Props>();

  const localeLabel = {
    RU: 'На русском',
    EN: 'На английском',
  };
</script>

<template>
  <div>
    <figure>
      <img
        data-testid="image"
        :src="certificate.image"
        :alt="certificate.course.name"
      >
      <figcaption class="text-center" data-testid="label">
        {{ localeLabel[certificate.language] }}
      </figcaption>
    </figure>
    <div class="mt-8 flex flex-wrap justify-center gap-x-16 gap-y-8">
      <a class="link" data-testid="download" :href="certificate.image" download>Скачать</a>
      <a
        class="link"
        data-testid="linkedin"
        :href="getCertificateLink(certificate.slug || '')"
      >Ссылка для LinkedIn</a>
    </div>
  </div>
</template>
