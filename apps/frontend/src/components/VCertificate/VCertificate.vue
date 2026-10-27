<script lang="ts" setup>
  import type { Diploma } from '@/api/generated';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    certificate: Diploma;
  }>();

  const certificateLink = computed(
    () => `https://cert.tough-dev.school/${props.certificate.slug}/en`,
  );

  const { t } = useI18n();

  const localeLabel = computed(() => ({
    RU: t('certificates.inRussian'),
    EN: t('certificates.inEnglish'),
  }));
</script>

<template>
  <div>
    <figure>
      <img
        data-testid="image"
        :src="certificate.image"
        :alt="certificate.course.product_name"
      />
      <figcaption
        class="text-center"
        data-testid="label"
      >
        {{ localeLabel[certificate.language] }}
      </figcaption>
    </figure>
    <div class="mt-8 flex flex-wrap justify-center gap-x-16 gap-y-8">
      <a
        class="link"
        data-testid="download"
        :href="certificate.image"
        download
        >{{ t('certificates.download') }}</a
      >
      <a
        class="link"
        data-testid="linkedin"
        :href="certificateLink"
        >{{ t('certificates.linkedin') }}</a
      >
    </div>
  </div>
</template>
