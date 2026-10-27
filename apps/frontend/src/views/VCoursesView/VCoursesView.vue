<script lang="ts" setup>
  import VCover from '@/components/VCover/VCover.vue';
  import { RouterLink } from 'vue-router';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { usePurchasedCoursesList } from '@/api/generated';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useLandingUrl } from '@/composables/useLandingUrl';

  const { t } = useI18n();
  const landingUrl = useLandingUrl();

  const footerLandingUrl = computed(() => {
    const url = new URL(landingUrl.value);
    url.searchParams.set('utm_source', 'lms');
    url.searchParams.set('utm_campaign', 'footer');
    return url.href;
  });
  const landingHostname = computed(() => new URL(landingUrl.value).hostname);

  const { data, isLoading } = usePurchasedCoursesList({ page_size: 100 });
  const studies = computed(() => data.value?.results);
</script>

<template>
  <VLoggedLayout
    v-if="!isLoading"
    :title="t('common.myCourses')"
  >
    <ul
      v-if="studies && studies.length > 0"
      class="grid gap-16 phone:gap-24 tablet:gap-32"
    >
      <li
        v-for="(study, index) in studies"
        :key="index"
      >
        <RouterLink
          class="link"
          data-testid="study"
          :to="{
            name: 'course',
            params: { courseId: study.id },
          }"
        >
          <VCover
            :name="study.name"
            :image="study.cover ?? undefined"
            class="overflow-hidden rounded-16"
          />
        </RouterLink>
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
  <VLoadingView v-else />
</template>
