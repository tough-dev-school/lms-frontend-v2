<script lang="ts" setup>
  defineProps({
    name: { type: String, default: '' },
    surname: { type: String, default: '' },
  });
</script>

<template>
  <div
    class="flex h-32 w-32 items-center justify-center rounded-full bg-black text-sub uppercase leading-[32px] text-white">
    {{ name[0] }}{{ surname[0] }}
  </div>
</template>
