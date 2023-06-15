<script lang="ts" setup>
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
      class="secondary-action"
      data-testid="delete"
      v-if="allowDelete"
      @click="emit('delete')">
      Удалить <sup>{{ `<${deleteTime} мин` }}</sup>
    </button>
    <button
      class="secondary-action"
      data-testid="edit"
      v-if="allowEdit"
      @click="emit('edit')">
      Редактировать <sup>{{ `<${editTime} мин` }}</sup>
    </button>
  </div>
</template>
