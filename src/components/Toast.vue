<script lang="ts" setup>
  import { onMounted, onUnmounted } from 'vue';

  const props = defineProps({
    text: { type: String, default: 'Ошибка!' },
    id: { type: String, required: true },
    lifetime: { type: Number, required: true },
  });

  const emit = defineEmits(['delete']);
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
    class="cursor-pointer rounded-8 bg-white p-16 shadow"
    @click="emit('delete', id)">
    {{ text }}
  </div>
</template>
