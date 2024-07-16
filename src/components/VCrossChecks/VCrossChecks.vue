<script setup lang="ts">
  import { computed } from 'vue';
  import getName from '@/utils/getName';

  import type { CrossCheck } from '@/types/homework';

  const props = defineProps<{
    crosschecks: CrossCheck[];
  }>();

  const notCheckedCrossChecks = computed(() => {
    return props.crosschecks.filter((crosscheck) => !crosscheck.is_checked);
  });
</script>

<template>
  <div
    v-if="notCheckedCrossChecks.length > 0"
    class="overflow-hidden rounded bg-white p-16 shadow dark:bg-dark-gray phone:px-24 tablet:px-32 bg-yellow-light">
    <p class="mb-8">Выберите работу коллеги по курсу для проверки:</p>
    <ul class="mb-16">
      <li
        v-for="crosscheck in notCheckedCrossChecks"
        :key="crosscheck.answer.url"
        data-testid="crosscheck">
        <router-link class="link" :to="crosscheck.answer.url"
          >{{
            getName(
              crosscheck.answer.author.firstName,
              crosscheck.answer.author.lastName,
            )
          }}
          ({{
            crosscheck.is_checked ? 'проверено' : 'не проверено'
          }})</router-link
        >
      </li>
    </ul>
    <p class="font-bold">
      Вы не сможете посмотреть проверки вашей домашки, пока не проверите работы
      коллег
    </p>
  </div>
</template>
