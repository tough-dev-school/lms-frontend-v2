<script lang="ts" setup>
  import { TrashXIcon, PencilPlusIcon } from 'vue-tabler-icons';

  const emit = defineEmits<{
    delete: [];
    edit: [];
  }>();
</script>

<template>
  <div class="flex items-center gap-8">
    <button class="answer-action" data-testid="delete" @click="emit('delete')">
      <TrashXIcon />
    </button>
    <button class="answer-action" data-testid="edit" @click="emit('edit')">
      <PencilPlusIcon />
    </button>
  </div>
</template>
