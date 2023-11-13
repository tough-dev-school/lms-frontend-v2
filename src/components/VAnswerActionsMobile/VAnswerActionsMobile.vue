<script lang="ts" setup>
  import VFloat from '@/components/VFloat/VFloat.vue';

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
          data-testid="delete"
          @click="emit('delete')">
          Удалить
        </button>
      </li>
      <li class="text-base">
        <button
          class="link h-32 w-full px-8 text-left"
          data-testid="edit"
          @click="emit('edit')">
          Редактировать
        </button>
      </li>
    </ul>
  </VFloat>
</template>
