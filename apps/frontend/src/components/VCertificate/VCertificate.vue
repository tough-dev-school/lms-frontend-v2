<script lang="ts" setup>
  import type { Diploma } from '@/api/generated-api';
  import { getCrossOriginImgAttrs } from '@/utils/getCrossOriginImageAttributes';
  import { computed } from 'vue';

  const props = defineProps<{
    certificate: Diploma;
  }>();

  const certificateLink = computed(
    () => `https://cert.tough-dev.school/${props.certificate.slug}/en`,
  );

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
        :alt="certificate.course.product_name"
        v-bind="getCrossOriginImgAttrs(certificate.image)" />
      <figcaption class="text-center" data-testid="label">
        {{ localeLabel[certificate.language] }}
      </figcaption>
    </figure>
    <div class="mt-8 flex flex-wrap justify-center gap-x-16 gap-y-8">
      <a class="link" data-testid="download" :href="certificate.image" download
        >Скачать</a
      >
      <a class="link" data-testid="linkedin" :href="certificateLink"
        >Ссылка для LinkedIn</a
      >
    </div>
  </div>
</template>
