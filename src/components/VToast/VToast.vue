<script lang="ts" setup>
  import { onMounted, onUnmounted, withDefaults } from 'vue';

  export type ToastTypes = 'error' | 'success';

  export interface Props {
    id: string;
    lifetime: number;
    text: string;
    type?: ToastTypes;
  }

  const props = withDefaults(defineProps<Props>(), { text: 'Ошибка!' });

  const emit = defineEmits<{
    delete: [id: string];
  }>();

  let timeout: ReturnType<typeof setTimeout>;

  onMounted(() => {
    timeout = setTimeout(() => {
      emit('delete', props.id);
    }, props.lifetime);
  });

  onUnmounted(() => {
    clearTimeout(timeout);
  });
</script>

<template>
  <div
    class="cursor-pointer rounded-8 p-16 shadow"
    :class="{
      'bg-white': !type,
      'bg-red': type === 'error',
      'bg-green': type === 'success',
    }"
    @click="emit('delete', id)">
    {{ text }}
  </div>
</template>
