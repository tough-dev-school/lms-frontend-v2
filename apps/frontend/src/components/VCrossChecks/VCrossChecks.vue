<script setup lang="ts">
  import { getName } from '@/utils/getName';
  import type { CrossCheck } from '@/api/generated';

  defineProps<{
    crosschecks: CrossCheck[];
  }>();

  const getCrossCheckState = (isChecked: CrossCheck['is_checked']) => {
    if (isChecked) {
      return 'проверено';
    }

    return 'не проверено';
  };

  const getStudentName = ({
    firstName,
    lastName,
    index,
  }: {
    firstName?: string;
    lastName?: string;
    index: number;
  }) => {
    if (firstName || lastName) {
      return getName(firstName, lastName);
    }

    return `Коллега ${index + 1}`;
  };
</script>

<template>
  <div
    class="overflow-hidden rounded bg-white p-16 shadow dark:bg-dark-gray phone:px-24 tablet:px-32"
  >
    <p class="mb-8 font-bold">Выберите работу коллеги по курсу для проверки:</p>
    <ol class="mb-16 list-inside list-decimal">
      <li
        v-for="(crosscheck, index) in crosschecks"
        :key="crosscheck.answer.url"
        data-testid="crosscheck"
      >
        <a
          class="link"
          :href="crosscheck.answer.url"
          >{{
            getStudentName({
              firstName: crosscheck.answer.author.first_name,
              lastName: crosscheck.answer.author.last_name,
              index,
            })
          }}
          ({{ getCrossCheckState(crosscheck.is_checked) }})</a
        >
      </li>
    </ol>
    <p>
      <b>Напоминаем:</b> ответы на вашу домашку от других студентов будут
      доступны после того, как вы проверите работы коллег из списка выше.
    </p>
  </div>
</template>
