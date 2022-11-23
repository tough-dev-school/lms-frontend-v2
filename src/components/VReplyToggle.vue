<script setup lang="ts">
  export interface Props {
    modelValue: boolean;
  }

  defineProps<Props>();
  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();
</script>

<template>
  <button
    class="text-sub text-gray"
    :class="{
      'transition-opacity group-hover:opacity-100 tablet:opacity-0':
        !modelValue,
    }"
    @click="emit('update:modelValue', !modelValue)">
    {{ modelValue ? 'Не отвечать' : 'Ответить' }}
  </button>
</template>
