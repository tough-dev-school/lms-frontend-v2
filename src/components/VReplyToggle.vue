<script setup lang="ts">
  export interface Props {
    modelValue: boolean;
  }

  defineProps<Props>();
  const emit = defineEmits(['update:modelValue']);
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
