<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useRoute } from 'vue-router';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useLessonsQuery } from '@/query';
  import VButton from '@/components/VButton/VButton.vue';
  import VTag from '@/components/VTag/VTag.vue';

  const route = useRoute();
  const moduleId = Number(route.params.moduleId);

  const { data: lessons } = useLessonsQuery(moduleId);

  const breadcrumbs: Breadcrumb[] = [
    { name: 'Мои курсы', to: { name: 'home' } },
    { name: 'COURSENAME', to: { name: 'modules' } },
    { name: 'LESSONNAME' },
  ];
</script>

<template>
  <VBreadcrumbs :items="breadcrumbs" />
  <div class="VLessonsView gap-32 flex flex-col">
    <VHeading tag="h1">Все уроки</VHeading>
    <div v-if="lessons && lessons.length > 0" class="VLessonsView__Layout">
      <VCard
        v-for="lesson in lessons"
        :key="lesson.id"
        :class="[
          'VLessonsView__Item',
          'dark:!bg-accent-yellow !bg-accent-yellow text-black flex-shrink py-24',
        ]">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col gap-16">
            <div class="empty:hidden gap-8 flex flex-wrap">
              <VTag v-if="lesson.homework.question.deadline"
                >Дедлайн {{ lesson.homework.question.deadline }}</VTag
              >
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
            class="VLessonsView__Button bg-white rounded-8"
            >Открыть материалы</VButton
          >
          <VButton
            v-if="lesson.homework"
            class="VLessonsView__Button bg-white rounded-8"
            >Отправить домашку</VButton
          >
        </div>
      </VCard>
    </div>
    <p v-else data-testid="empty" class="mb-16 text-center">
      Нет доступных уроков.
    </p>
  </div>
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
    }
  }
</style>
