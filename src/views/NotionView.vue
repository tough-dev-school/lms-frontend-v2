<script lang="ts" setup>
  import { NotionRenderer } from 'vue3-notion';
  import axios from '@/axios';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';

  const route = useRoute();
  const blocks = ref('');

  onMounted(async () => {
    const response = await axios.get(
      `/api/v2/notion/materials/${route.params.id}/`,
    );

    blocks.value = response.data;
  });
</script>

<template>
  <NotionRenderer v-if="blocks" :blockMap="blocks" fullPage />
</template>

<style lang="scss">
  @import 'vue3-notion/dist/style.css';
</style>
