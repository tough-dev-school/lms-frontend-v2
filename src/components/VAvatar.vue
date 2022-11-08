<script lang="ts" setup>
  defineProps({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
  });
</script>

<template>
  <div
    class="flex h-32 w-32 items-center justify-center rounded-full bg-black text-sub uppercase leading-[32px] text-white">
    {{ firstName[0] }}{{ lastName[0] }}
  </div>
</template>
