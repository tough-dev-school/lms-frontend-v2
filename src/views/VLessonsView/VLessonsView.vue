<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useLessonsQuery, fetchModules } from '@/query';
  import VTag from '@/components/VTag/VTag.vue';
  import { onBeforeMount, computed, ref } from 'vue';
  import { useRouteParams } from '@vueuse/router';
  import { useQueryClient } from '@tanstack/vue-query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { useStudiesQuery } from '@/query';

  const queryClient = useQueryClient();
  const courseId = useRouteParams('courseId', '0', {
    transform: (value) => parseInt(value),
  });
  const moduleId = useRouteParams('moduleId', '0', {
    transform: (value) => parseInt(value),
  });

  const { data: studies } = useStudiesQuery();

  const courseName = computed(
    () =>
      (studies.value ?? []).find((study) => study.id === courseId.value)?.name,
  );
  const moduleName = ref('');

  const { data: lessons } = useLessonsQuery(moduleId);

  const breadcrumbs = computed<Breadcrumb[]>(() => [
    { name: 'Главная', to: { name: 'home' } },
    {
      name: courseName.value ? courseName.value : 'Материалы курса',
      to: { name: 'modules', params: { courseId: courseId.value } },
    },
    {
      name: moduleName.value,
      to: {
        name: 'lessons',
        params: { courseId: courseId.value, moduleId: moduleId.value },
      },
    },
  ]);

  onBeforeMount(async () => {
    const modules = await fetchModules(queryClient, {
      courseId: courseId.value,
    });

    moduleName.value =
      modules.find((module) => module.id === moduleId.value)?.name ?? '';
  });
</script>

<template>
  <VLoggedLayout :title="moduleName" :breadcrumbs="breadcrumbs">
    <div class="VLessonsView gap-32 flex flex-col">
      <div v-if="lessons && lessons.length > 0" class="VLessonsView__Layout">
        <div
          v-for="lesson in lessons"
          :key="lesson.id"
          class="VLessonsView__Item">
          <VCard
            :class="[
              'dark:!bg-accent-yellow !bg-accent-yellow text-black flex-shrink py-24',
            ]">
            <div class="flex flex-col gap-10">
              <div class="flex flex-col gap-16">
                <div class="empty:hidden gap-8 flex flex-wrap">
                  <VTag v-if="lesson.homework?.question.deadline">
                    Дедлайн {{ lesson.homework.question.deadline }}
                  </VTag>
                </div>
                <VHeading tag="h3" class="mb-8">{{ lesson.name }}</VHeading>
              </div>
              <div v-if="lesson.homework">
                <table class="w-full">
                  <tr v-if="lesson.homework.crosschecks">
                    <td class="font-bold">Проверенны домашки коллег</td>
                    <td class="text-right">
                      {{ lesson.homework.crosschecks.checked }} из
                      {{ lesson.homework.crosschecks.total }}
                    </td>
                  </tr>
                </table>
              </div>
              <VButton
                v-if="lesson.material"
                tag="RouterLink"
                class="VLessonsView__Button"
                appearance="secondary"
                :to="{
                  name: 'materials',
                  params: {
                    materialId: lesson.material.id,
                  },
                }">
                Открыть материалы
              </VButton>
              <VButton
                v-if="lesson.homework"
                tag="RouterLink"
                class="VLessonsView__Button"
                appearance="secondary"
                :to="{
                  name: 'homework-question',
                  params: { questionId: lesson.homework.question.slug },
                }">
                Отправить домашку
              </VButton>
            </div>
          </VCard>
        </div>
      </div>
      <p v-else data-testid="empty" class="mb-16 text-center">
        Нет доступных уроков.
      </p>
    </div>
  </VLoggedLayout>
</template>

<style>
  .VLessonsView {
    --gap: 32px;
    &__Layout {
      display: flex;
      flex-wrap: wrap;
      gap: var(--gap);
    }
    &__Item {
      flex-grow: 1;
      flex-basis: calc(50% - var(--gap) / 2);
    }
    &__Button {
      --module: 40px;
      @apply bg-white rounded-8;
    }
  }
</style>
