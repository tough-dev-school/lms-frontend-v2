<script lang="ts" setup>
  import { VFloat } from '@/components/VFloat';

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
  <VFloat data-testid="menu" class="block" v-if="allowDelete || allowEdit">
    <ul>
      <li class="text-base">
        <button
          class="link h-32 w-full px-8 text-left"
          v-if="allowDelete"
          @click="emit('delete')"
          data-testid="delete">
          Удалить <sup>{{ `<${deleteTime} мин` }}</sup>
        </button>
      </li>
      <li class="text-base">
        <button
          class="link h-32 w-full px-8 text-left"
          v-if="allowEdit"
          @click="emit('edit')"
          data-testid="edit">
          Редактировать <sup>{{ `<${editTime} мин` }}</sup>
        </button>
      </li>
    </ul>
  </VFloat>
</template>
