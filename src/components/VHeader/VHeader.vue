<script lang="ts" setup>
  import VLogo from '@/components/VLogo/VLogo.vue';
</script>

<template>
  <header
    class="flex flex-wrap justify-between items-center pt-16 tablet:pt-32 pb-24 tablet:pb-32 gap-8">
    <RouterLink to="/" data-testid="logo" class="se:block hidden">
      <VLogo />
    </RouterLink>
    <slot />
  </header>
</template>
