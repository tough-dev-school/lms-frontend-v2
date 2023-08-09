<script lang="ts" setup>
  import { VFloat } from '@/components/VFloat';

  const emit = defineEmits<{
    delete: [];
    edit: [];
  }>();
</script>

<template>
  <VFloat data-testid="menu" class="block">
    <ul>
      <li class="text-base">
        <button
          class="link h-32 w-full px-8 text-left"
          @click="emit('delete')"
          data-testid="delete">
          Удалить
        </button>
      </li>
      <li class="text-base">
        <button
          class="link h-32 w-full px-8 text-left"
          @click="emit('edit')"
          data-testid="edit">
          Редактировать
        </button>
      </li>
    </ul>
  </VFloat>
</template>
