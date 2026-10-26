<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import type { Course } from '@/api/generated';
  import type { ModuleWithLesson } from '@/types';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPill from '@/components/VPill/VPill.vue';
  import VPillItem from '@/components/VPill/VPillItem.vue';
  import VModuleCard from '@/components/VModuleCard/VModuleCard.vue';
  import { urls } from '@/urls';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    courseId: number;
    study: Course | null;
    modules: ModuleWithLesson[];
  }>();

  const { t } = useI18n();

  const courseName = computed(() => props.study?.name);

  const breadcrumbs = computed<Breadcrumb[]>(() => [
    { name: t('common.myCourses'), href: urls.courses() },
    {
      name: courseName.value ?? t('common.courseMaterials'),
      href: urls.course(props.courseId),
    },
  ]);

  const courseInfo = computed(() => {
    if (
      !props.study?.calendar_google &&
      !props.study?.calendar_ios &&
      !props.study?.chat
    ) {
      return [];
    }
    return [1];
  });
</script>

<template>
  <VLoggedLayout
    :title="courseName"
    :breadcrumbs="breadcrumbs"
  >
    <template
      v-if="courseInfo.length > 0"
      #pill
    >
      <VPill>
        <template v-if="study?.calendar_google || study?.calendar_ios">
          <VPillItem>
            <div
              class="flex flex-col items-center justify-center text-center font-medium"
            >
              <div>{{ t('course.calendar') }}</div>
              <div class="flex gap-16">
                <a
                  v-if="study?.calendar_google"
                  class="link-bright"
                  :href="study.calendar_google"
                >
                  Google
                </a>
                <a
                  v-if="study?.calendar_ios"
                  class="link-bright"
                  :href="study.calendar_ios"
                >
                  iOS
                </a>
              </div>
            </div>
          </VPillItem>
        </template>
        <VPillItem
          v-if="study?.chat"
          :to="study.chat"
        >
          {{ t('course.chat') }}
        </VPillItem>
        <template v-if="study?.links?.length">
          <VPillItem
            v-for="(link, index) in study.links"
            :key="index"
            :to="link.url"
          >
            {{ link.name }}
          </VPillItem>
        </template>
      </VPill>
    </template>
    <div
      v-if="modules.length > 0"
      class="grid gap-16 phone:gap-24 tablet:gap-32"
    >
      <VModuleCard
        v-for="(module, index) in modules"
        :key="module.id"
        :course-id="courseId"
        :module="module"
        :only-lesson="module.onlyLesson"
        :index="index"
      />
    </div>

    <p
      v-else
      data-testid="empty"
      class="mb-16 text-center"
    >
      {{ t('course.empty') }}
    </p>
  </VLoggedLayout>
</template>
