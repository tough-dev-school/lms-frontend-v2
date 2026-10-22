<script lang="ts" setup>
  import { SUPPORT_CHAT_URL } from '@/constants';
  import { IconBrandTelegram } from '@tabler/icons-vue';
</script>

<template>
  <a
    data-testid="support-chat"
    class="fixed bottom-16 right-24 z-50 flex aspect-square w-48 items-center justify-center rounded-full bg-blue text-white shadow-sm"
    :href="SUPPORT_CHAT_URL"
  >
    <IconBrandTelegram />
  </a>
</template>
