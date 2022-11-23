<script lang="ts" setup>
  export interface Props {
    firstName?: string;
    lastName?: string;
  }

  withDefaults(defineProps<Props>(), { firstName: '', lastName: '' });
</script>

<template>
  <div
    class="flex h-32 w-32 items-center justify-center rounded-full bg-black text-sub uppercase leading-[32px] text-white">
    {{ firstName[0] }}{{ lastName[0] }}
  </div>
</template>
