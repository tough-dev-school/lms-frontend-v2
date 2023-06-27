<script lang="ts" setup>
  import { TrashXIcon, PencilPlusIcon } from 'vue-tabler-icons';

  export interface Props {
    allowDelete: boolean;
    allowEdit: boolean;
    deleteTime: number;
    editTime: number;
  }

  defineProps<Props>();

  const emit = defineEmits<{
    delete: [];
    edit: [];
  }>();
</script>

<template>
  <div class="flex items-center gap-8">
    <button
      class="answer-action"
      data-testid="delete"
      v-if="allowDelete"
      @click="emit('delete')">
      <TrashXIcon /> {{ `<${deleteTime} мин` }}
    </button>
    <button
      class="answer-action"
      data-testid="edit"
      v-if="allowEdit"
      @click="emit('edit')">
      <PencilPlusIcon /> {{ `<${editTime} мин` }}
    </button>
  </div>
</template>
