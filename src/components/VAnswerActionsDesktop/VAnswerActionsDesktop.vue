<script lang="ts" setup>
  import { TrashXIcon, PencilPlusIcon } from 'vue-tabler-icons';
  import VButton from '../VButton/VButton.vue';

  const emit = defineEmits<{
    delete: [];
    edit: [];
  }>();
</script>

<template>
  <div class="flex items-center gap-8">
    <VButton
      appearance="secondary"
      size="inline"
      class="h-32 px-16"
      data-testid="delete"
      @click="emit('delete')">
      <TrashXIcon />
    </VButton>
    <VButton
      appearance="secondary"
      size="inline"
      class="h-32 px-16"
      data-testid="edit"
      @click="emit('edit')">
      <PencilPlusIcon />
    </VButton>
  </div>
</template>
