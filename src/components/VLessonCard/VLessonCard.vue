<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VTag from '@/components/VTag/VTag.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import type { RouteLocationRaw } from 'vue-router';
  import type { LessonForUser } from '@/api/generated-api';
  import { computed } from 'vue';

  const props = defineProps<{
    lesson: LessonForUser;
  }>();

  const links = computed(() => {
    let items: Array<
      {
        name: string;
        label: string;
      } & ({ to: RouteLocationRaw } | { href: string })
    > = [];

    if (props.lesson.material) {
      items.push({
        name: props.lesson.material.title || '',
        label: 'Открыть материалы',
        to: {
          name: 'materials',
          params: { materialId: props.lesson.material.id },
        },
      });
    }

    if (props.lesson.homework) {
      items.push({
        name: props.lesson.homework.question.name || '',
        label: 'Отправить домашку',
        to: {
          name: 'homework-question',
          params: { questionId: props.lesson.homework.question.slug },
        },
      });
    }

    if (props.lesson.call) {
      items.push({
        name: props.lesson.call.name || '',
        label: 'Открыть звонок',
        href: props.lesson.call.url,
      });
    }

    return items;
  });

  const name = computed(() => {
    return links.value.length > 0 ? links.value[0].name : '';
  });
</script>

<template>
  <div
    :class="[
      'VLessonCard flex flex-col gap-10',
      'dark:!bg-accent-yellow !bg-accent-yellow text-black flex-shrink py-24 rounded-16 p-16 tablet:p-24',
    ]">
    <div class="flex flex-col gap-16">
      <div class="empty:hidden gap-8 flex flex-wrap">
        <VTag v-if="lesson.homework?.question.deadline">
          Дедлайн {{ lesson.homework.question.deadline }}
        </VTag>
      </div>
      <VHeading tag="h3" class="mb-8">{{ name }}</VHeading>
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
    <div class="flex-grow"></div>
    <template v-for="link in links" :key="link.label">
      <VButton
        v-if="'to' in link"
        tag="RouterLink"
        class="VLessonCard__Button"
        appearance="secondary"
        :to="link.to">
        {{ link.label }}
      </VButton>
      <VButton
        v-if="'href' in link"
        tag="a"
        class="VLessonCard__Button"
        appearance="secondary"
        :href="link.href">
        {{ link.label }}
      </VButton>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .VLessonCard__Button {
    --module: 40px;
    @apply bg-white rounded-8;
  }
</style>
