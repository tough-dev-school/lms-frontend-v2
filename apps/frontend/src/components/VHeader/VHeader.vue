<script lang="ts" setup>
  import VLogo from '@/components/VLogo/VLogo.vue';
</script>

<template>
  <header
    class="flex items-center justify-between gap-8 pb-24 pt-16 tablet:pb-32 tablet:pt-32"
  >
    <RouterLink
      to="/"
      data-testid="logo"
    >
      <VLogo />
    </RouterLink>
    <slot />
  </header>
</template>
