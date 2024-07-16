<script setup lang="ts">
  import { computed } from 'vue';
  import getName from '@/utils/getName';

  import type { CrossCheck } from '@/types/homework';

  const props = defineProps<{
    crosschecks: CrossCheck[];
  }>();

  const nonCheckedCrossChecks = computed(() => {
    return props.crosschecks.filter((crosscheck) => !crosscheck.is_checked);
  });

  const getCrossCheckState = (isChecked: bool) => {
    if (isChecked) {
      return 'проверено';
    }

    return 'не проверено';
  };

  const getStudentName = (firstName: string, lastName: string, index: int) => {
    if (firstName || lastName) {
      return getName(firstName, lastName);
    }

    return `Студент ${index + 1}`;
  };
</script>

<template>
  <div
    v-if="nonCheckedCrossChecks.length > 0"
    class="overflow-hidden rounded bg-white p-16 shadow dark:bg-dark-gray phone:px-24 tablet:px-32 bg-yellow-light">
    <p class="mb-8">Выберите работу коллеги по курсу для проверки:</p>
    <ul class="mb-16">
      <li
        v-for="(crosscheck, index) in notCheckedCrossChecks"
        :key="crosscheck.answer.url"
        data-testid="crosscheck">
        <router-link class="link" :to="crosscheck.answer.url"
          >{{
            getStudentName(
              crosscheck.answer.author.first_name,
              crosscheck.answer.author.last_name,
              index,
            )
          }}
          ({{ getCrossCheckState(crosscheck.is_checked) }})</router-link
        >
      </li>
    </ul>
    <p class="font-bold">
      Вы не сможете посмотреть проверки вашей домашки, пока не проверите работы
      коллег
    </p>
  </div>
</template>
