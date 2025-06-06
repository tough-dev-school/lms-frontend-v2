<script lang="ts" setup>
  import { useMaterialQuery } from '@/query';
  import VNotionView from './VNotionView.vue';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';

  const props = defineProps<{
    materialId: string;
  }>();

  const { data: materialData } = useMaterialQuery(props.materialId);
</script>

<template>
  <VNotionView
    v-if="materialData"
    :material-data="materialData"
    :material-id="materialId" />
  <VLoadingView v-else />
</template>
