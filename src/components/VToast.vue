<script lang="ts" setup>
  import { onMounted, onUnmounted } from 'vue';

  const props = defineProps({
    text: { type: String, default: 'Ошибка!' },
    id: { type: String, required: true },
    lifetime: { type: Number, required: true },
    type: { type: String, required: false },
  });

  const emit = defineEmits<{ 
    (e: 'delete', id: string): void 
  }>()
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
      'bg-red-light bg-opacity-50': type === 'error',
      'bg-green-light bg-opacity-50': type === 'success',
    }"
    @click="emit('delete', id)">
    {{ text }}
  </div>
</template>
