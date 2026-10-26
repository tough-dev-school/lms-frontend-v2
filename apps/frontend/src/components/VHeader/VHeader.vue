<script lang="ts" setup>
  import { Link } from '@inertiajs/vue3';
  import VLogo from '@/components/VLogo/VLogo.vue';
</script>

<template>
  <header
    class="flex items-center justify-between gap-8 pb-24 pt-16 tablet:pb-32 tablet:pt-32"
  >
    <Link
      href="/"
      data-testid="logo"
    >
      <VLogo />
    </Link>
    <slot />
  </header>
</template>
