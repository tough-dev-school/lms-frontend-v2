<script lang="ts" setup>
  export interface Props {
    allowDelete: boolean;
    allowEdit: boolean;
    deleteTime: number;
    editTime: number;
  }

  defineProps<Props>();

  const emit = defineEmits<{
    (e: 'delete'): void;
    (e: 'edit'): void;
  }>();
</script>

<template>
  <button class="secondary-action" v-if="allowDelete" @click="emit('delete')">
    Удалить <sup>{{ `<${deleteTime} мин` }}</sup>
  </button>
  <button class="secondary-action" v-if="allowEdit" @click="emit('edit')">
    Редактировать <sup>{{ `<${editTime} мин` }}</sup>
  </button>
</template>
