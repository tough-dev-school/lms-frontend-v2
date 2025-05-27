<script lang="ts" setup>
  import { useMaterialQuery } from '@/query';
  import { useRouteParams } from '@vueuse/router';
  import VNotionView from './VNotionView.vue';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';

  const materialId = useRouteParams<string>('materialId');

  const { data: materialData } = useMaterialQuery(materialId);
</script>

<template>
  <VNotionView
    v-if="materialData"
    :material-data="materialData"
    :material-id="materialId" />
  <VLoadingView v-else />
</template>
