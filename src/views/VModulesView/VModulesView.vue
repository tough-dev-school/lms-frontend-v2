<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import { computed } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useModulesQuery, useStudiesQuery } from '@/query';
  import { useRouteParams } from '@vueuse/router';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPill, { type PillItem } from '@/components/VPill/VPill.vue';

  const route = useRoute();

  const courseId = useRouteParams('courseId', '0', {
    transform: (value) => parseInt(value),
  });

  const { data: studies } = useStudiesQuery();

  const study = computed(() =>
    (studies.value || []).find((study) => study.id === courseId.value),
  );

  const courseName = computed(() => study.value?.name);

  const { data: modules } = useModulesQuery(() =>
    parseInt(route.params.courseId.toString()),
  );

  const cardClass = (number: number) => {
    // Sadly, Tailwind will strip dynamic classes, so we need to do this manually
    const colors = [
      '!bg-accent-yellow dark:!bg-accent-yellow',
      '!bg-accent-orange dark:!bg-accent-orange',
      '!bg-accent-green dark:!bg-accent-green',
      '!bg-accent-blue dark:!bg-accent-blue',
    ];

    return colors[number % colors.length];
  };

  const breadcrumbs = computed<Breadcrumb[]>(() => [
    { name: 'Мои курсы', to: { name: 'home' } },
    {
      name: courseName.value ? courseName.value : 'Материалы курса',
      to: { name: 'modules', params: { courseId: courseId.value } },
    },
  ]);

  const courseInfo = computed(() => {
    const items: PillItem[] = [];

    if (study.value?.calendar_google || study.value?.calendar_ios) {
      items.push('calendar');
    }

    if (study.value?.chat) {
      items.push({ label: 'Чат', to: study.value?.chat });
    }

    return items;
  });
</script>

<template>
  <VLoggedLayout :title="courseName" :breadcrumbs="breadcrumbs">
    <template v-if="courseInfo.length > 0" #pill>
      <VPill :items="courseInfo">
        <template #pill-calendar>
          <div
            class="font-medium text-center flex justify-center items-center flex-col">
            <div>Календарь</div>
            <div>
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
                iOS</a
              >
            </div>
          </div>
        </template>
      </VPill>
    </template>
    <template v-if="modules && modules.length > 0">
      <RouterLink
        v-for="(module, index) in modules"
        :key="module.id"
        :to="{ name: 'lessons', params: { moduleId: module.id } }">
        <div
          :class="[
            cardClass(index),
            'text-black min-h-120 rounded-16 p-16 tablet:p-24',
          ]">
          <VHeading tag="h3">{{ module.name }}</VHeading>
        </div>
      </RouterLink>
    </template>

    <p v-else data-testid="empty" class="mb-16 text-center">
      Нет доступных модулей.
    </p>
  </VLoggedLayout>
</template>
