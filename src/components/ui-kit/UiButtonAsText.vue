<template>
  <button v-bind="{ ...$attrs, ...$props }" class="ui-button-as-text" v-on="$listeners">
    <slot />
  </button>
</template>
<style scoped>
.ui-button-as-text {
  @mixin robot-text-two;
  display: inline;
  padding: 0;
  margin: 0;
  color: var(--link);
  line-height: 1;
  border: none;
  background: transparent;
  cursor: pointer;

  &:focus:not(:active),
  &:hover:not(:active) {
    color: var(--link-hover);
  }

  &:disabled {
    pointer-events: none;
    color: var(--superlight);
  }
}
</style>
