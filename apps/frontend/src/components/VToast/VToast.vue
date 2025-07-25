<script lang="ts" setup>
  import { onMounted, onUnmounted } from 'vue';

  export type ToastTypes = 'error' | 'success';

  export interface Props {
    text?: string;
    id: string;
    lifetime: number;
    type?: ToastTypes;
  }

  const props = withDefaults(defineProps<Props>(), {
    text: 'Ошибка!',
    type: undefined,
  });

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
    class="cursor-pointer rounded-8 p-16 shadow dark:text-darkmode-layer1"
    :class="{
      'bg-white dark:bg-darkmode-white': !type,
      'bg-red dark:bg-darkmode-red': type === 'error',
      'bg-green dark:bg-darkmode-green': type === 'success',
    }"
    @click="emit('delete', id)"
  >
    {{ text }}
  </div>
</template>
