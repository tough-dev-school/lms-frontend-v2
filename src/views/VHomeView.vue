<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import useStudies from '@/stores/studies';

  const studies = useStudies();
</script>

<template>
  <VHeading>Ваши курсы</VHeading>
  <ul>
    <li v-for="(study, index) in studies.items" :key="index">
      <RouterLink
        class="link"
        :to="{
          name: 'materials',
          params: { id: study.homePageSlug },
        }">
        <p>{{ study.name }}</p>
      </RouterLink>
    </li>
  </ul>
  <div class="my-16 block text-center">
    <p v-if="studies.items.length === 0">Нет доступных курсов.</p>
    <p>
      Доступ к курсам можно купить на
      <a href="https://education.borshev.com/" class="link"
        >education.borshev.com</a
      >.
    </p>
  </div>
</template>
