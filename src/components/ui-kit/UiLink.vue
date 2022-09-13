<template>
  <component
    :is="component"
    v-bind="{ ...$attrs, ...$props }"
    :class="{ 'ui-link--disabled': isDisabled }"
    class="ui-link"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>
<script>
export default {
  name: "UiLink",
  props: {
    to: { type: [String, Object], default: "" },
    isDisabled: { type: Boolean, default: false },
  },
  computed: {
    component() {
      return this.to ? "router-link" : "a";
    },
  },
};
</script>
<style lang="postcss" scoped>
.ui-link {
  @mixin robot-text-default;
  color: var(--link);
  text-decoration: none;

  &:focus:not(:active),
  &:hover:not(:active) {
    color: var(--link-hover);
  }

  &--disabled {
    pointer-events: none;
    color: var(--superlight);
  }
}
</style>
