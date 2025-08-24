<script lang="ts" setup>
  import { SUPPORT_CHAT_URL } from '@/constants';
  import { IconBrandTelegram } from '@tabler/icons-vue';
</script>

<template>
  <a
    class="z-50 fixed aspect-square w-48 items-center justify-center flex shadow-sm bottom-16 right-24 rounded-full bg-blue text-white"
    :href="SUPPORT_CHAT_URL"
    target="_blank">
    <IconBrandTelegram />
  </a>
</template>
