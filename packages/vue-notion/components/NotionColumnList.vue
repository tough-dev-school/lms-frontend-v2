<template>
  <div class="notion-row">
    <slot />
  </div>
</template>

<script>
  import { Blockable } from '../lib/blockable';

  export default {
    extends: Blockable,
  };
</script>
