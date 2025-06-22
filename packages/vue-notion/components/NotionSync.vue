<template>
  <div v-if="isType('transclusion_container')" class="notion-sync-block">
    <slot />
  </div>
</template>

<script>
  import { Blockable } from '../lib/blockable';

  export default {
    extends: Blockable,
  };
</script>
