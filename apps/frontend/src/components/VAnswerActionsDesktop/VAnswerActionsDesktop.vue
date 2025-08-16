<script lang="ts" setup>
  import { IconTrash, IconPencilPlus } from '@tabler/icons-vue';
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
      <IconTrash />
    </VButton>
    <VButton
      appearance="secondary"
      size="inline"
      class="h-32 px-16"
      data-testid="edit"
      @click="emit('edit')">
      <IconPencilPlus />
    </VButton>
  </div>
</template>
