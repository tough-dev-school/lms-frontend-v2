<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useModulesQuery, useStudiesQuery } from '@/query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPill from '@/components/VPill/VPill.vue';
  import VPillItem from '@/components/VPill/VPillItem.vue';
  import VModuleCard from '@/components/VModuleCard/VModuleCard.vue';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';

  const props = defineProps<{
    courseId: number;
  }>();

  const { data: studies, isLoading } = useStudiesQuery();

  const study = computed(() =>
    (studies.value || []).find((study) => study.id === props.courseId),
  );

  const courseName = computed(() => study.value?.name);

  const { data: modules } = useModulesQuery(() => props.courseId);

  const breadcrumbs = computed<Breadcrumb[]>(() => [
    { name: 'Мои курсы', to: { name: 'home' } },
    {
      name: courseName.value ? courseName.value : 'Материалы курса',
      to: { name: 'modules', params: { courseId: props.courseId } },
    },
  ]);

  const courseInfo = computed(() => {
    if (
      !study.value?.calendar_google &&
      !study.value?.calendar_ios &&
      !study.value?.chat
    ) {
      return [];
    }
    return [1];
  });
</script>

<template>
  <VLoggedLayout
    v-if="!isLoading"
    :title="courseName"
    :breadcrumbs="breadcrumbs">
    <template v-if="courseInfo.length > 0" #pill>
      <VPill>
        <template v-if="study?.calendar_google || study?.calendar_ios">
          <VPillItem>
            <div
              class="font-medium text-center flex justify-center items-center flex-col">
              <div>Календарь событий</div>
              <div class="flex gap-16">
                <a
                  v-if="study?.calendar_google"
                  class="link-bright"
                  :href="study.calendar_google">
                  Google
                </a>
                <a
                  v-if="study?.calendar_ios"
                  class="link-bright"
                  :href="study.calendar_ios">
                  iOS
                </a>
              </div>
            </div>
          </VPillItem>
        </template>
        <VPillItem v-if="study?.chat" :to="study.chat"> Чат </VPillItem>
        <template v-if="study?.links?.length">
          <VPillItem
            v-for="(link, index) in study.links"
            :key="index"
            :to="link.url">
            {{ link.name }}
          </VPillItem>
        </template>
      </VPill>
    </template>
    <template v-if="modules && modules.length > 0">
      <RouterLink
        v-for="(module, index) in modules"
        :key="module.id"
        :to="{ name: 'lessons', params: { moduleId: module.id } }">
        <VModuleCard :key="module.id" :module="module" :index="index" />
      </RouterLink>
    </template>

    <p v-else data-testid="empty" class="mb-16 text-center">
      Нет доступных модулей.
    </p>
  </VLoggedLayout>
  <VLoadingView v-else />
</template>
