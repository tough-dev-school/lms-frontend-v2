<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';

  // Declared so renderer props don't land on the root element as attributes
  withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
</script>

<template>
  <div class="notion-row">
    <slot />
  </div>
</template>
