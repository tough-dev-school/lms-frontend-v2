<script lang="ts" setup>
  import useDiplomas from '@/stores/diplomas';

  const diplomas = useDiplomas();
</script>

<template>
  <ul class="flex flex-wrap gap-16">
    <li v-for="certificate in diplomas.items" :key="certificate.slug">
      <a :href="certificate.url" target="_blank" class="block">
        <img :src="certificate.image" :alt="certificate.course.name" />
        <p>{{ certificate.course.name }}</p>
      </a>
    </li>
    <li
      v-if="diplomas.items.length === 0"
      class="flex h-128 flex-grow items-center justify-center rounded border border-dashed border-gray text-center text-gray">
      Нет сертификатов
    </li>
  </ul>
</template>
