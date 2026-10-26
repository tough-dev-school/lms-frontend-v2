<script lang="ts" setup>
  import VCover from '@/components/VCover/VCover.vue';
  import { Link } from '@inertiajs/vue3';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import type { Course } from '@/api/generated';
  import { computed } from 'vue';
  import { urls } from '@/urls';
  import { useI18n } from 'vue-i18n';
  import { useLandingUrl } from '@/composables/useLandingUrl';

  defineProps<{
    studies: Course[];
  }>();

  const { t } = useI18n();
  const landingUrl = useLandingUrl();

  const footerLandingUrl = computed(() => {
    const url = new URL(landingUrl.value);
    url.searchParams.set('utm_source', 'lms');
    url.searchParams.set('utm_campaign', 'footer');
    return url.href;
  });
  const landingHostname = computed(() => new URL(landingUrl.value).hostname);
</script>

<template>
  <VLoggedLayout :title="t('common.myCourses')">
    <ul
      v-if="studies.length > 0"
      class="grid gap-16 phone:gap-24 tablet:gap-32"
    >
      <li
        v-for="(study, index) in studies"
        :key="index"
      >
        <Link
          class="link"
          data-testid="study"
          :href="urls.course(study.id)"
        >
          <VCover
            :name="study.name"
            :image="study.cover ?? undefined"
            class="overflow-hidden rounded-16"
          />
        </Link>
      </li>
    </ul>
    <p
      v-else
      data-testid="empty"
      class="text-center"
    >
      {{ t('courses.empty') }}
    </p>
    <i18n-t
      keypath="courses.buyAccess"
      tag="p"
      class="text-center"
      scope="global"
    >
      <template #link>
        <a
          :href="footerLandingUrl"
          class="link"
          data-testid="landing-link"
          >{{ landingHostname }}</a
        >
      </template>
    </i18n-t>
  </VLoggedLayout>
</template>
