<template>
  <component
    :is="component"
    v-bind="{ ...$attrs, ...$props }"
    :class="[`ui-button--${size}`, `ui-button--${colorType}`, isMobileFullWidth && 'ui-button--mobile-full-width']"
    class="ui-button"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>
<script>
const Size = {
  Big: "big",
  Small: "small",
};
const ColorType = {
  Primary: "primary",
  White: "white",
};

export default {
  name: "UiButton",
  props: {
    to: { type: [String, Object], default: "" },
    size: { type: String, required: true, validator: (val) => Object.values(Size).includes(val) },
    colorType: { type: String, required: true, validator: (val) => Object.values(ColorType).includes(val) },
    isFullWidth: { type: Boolean, default: false },
    isMobileFullWidth: { type: Boolean, default: false },
  },
  computed: {
    component() {
      return this.to ? "router-link" : "button";
    },
  },
};
</script>
<style lang="postcss" scoped>
.ui-button {
  @mixin robot-text-two;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;

  &--big {
    min-width: 284px;
    min-height: 52px;
    padding: 12px 20px 10px 20px;
  }

  &--small {
    min-width: 154px;
    min-height: 40px;
  }

  &--primary {
    background: var(--large);

    &:focus:not(:active),
    &:hover:not(:active) {
      background: var(--large-hover);
    }
  }

  &--white {
    background: var(--background);
    border: 1px solid var(--superlight);

    &:focus:not(:active),
    &:hover:not(:active) {
      border: 1px solid var(--basic);
    }
  }

  &--mobile-full-width {
    width: 100%;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

@media (--after-mobile) {
  .ui-button--mobile-full-width {
    width: initial;
  }
}
</style>
