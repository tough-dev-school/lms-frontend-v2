<script setup lang="ts">
  import { computed } from 'vue';
  import getName from '@/utils/getName';

  import type { CrossCheck } from '@/types/homework';

  const props = defineProps<{
    crosschecks: CrossCheck[];
  }>();

  const nonCheckedCrossChecks = computed(() => {
    return props.crosschecks.filter((crosscheck) => !crosscheck.isChecked);
  });

  const getCrossCheckState = (isChecked: boolean) => {
    if (isChecked) {
      return 'проверено';
    }

    return 'не проверено';
  };

  const getStudentName = (
    firstName: string,
    lastName: string,
    index: number,
  ) => {
    if (firstName || lastName) {
      return getName(firstName, lastName);
    }

    return `Коллега ${index + 1}`;
  };
</script>

<template>
  <div
    v-if="nonCheckedCrossChecks.length > 0"
    class="overflow-hidden rounded bg-white p-16 shadow dark:bg-dark-gray phone:px-24 tablet:px-32 bg-yellow-light">
    <p class="font-bold mb-8">Выберите работу коллеги по курсу для проверки:</p>
    <ol class="list-decimal list-inside mb-16">
      <li
        v-for="(crosscheck, index) in crosschecks"
        :key="crosscheck.answer.url"
        data-testid="crosscheck">
        <a class="link" :href="crosscheck.answer.url"
          >{{
            getStudentName(
              crosscheck.answer.author.firstName,
              crosscheck.answer.author.lastName,
              index,
            )
          }}
          ({{ getCrossCheckState(crosscheck.isChecked) }})</a
        >
      </li>
    </ol>
    <p>
      <b>Напоминаем:</b> ответы на вашу домашку от других студентов будут
      доступны после того, как вы проверите работы коллег из списка выше.
    </p>
  </div>
</template>
