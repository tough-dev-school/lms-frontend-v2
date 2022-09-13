<template>
  <div :class="{ 'ui-input--invalid': isInvalid, 'ui-input--disabled': isDisabled }" class="ui-input">
    <label class="ui-input__label" :for="labelFor">{{ label }}</label>
    <input :id="labelFor" ref="uiInput" :value="value" v-bind="nativeProps" class="ui-input__input" v-on="$listeners" />
    <p class="ui-input__bottom-text">{{ bottomText }}</p>
  </div>
</template>
<script>
export default {
  name: 'UiInput',
  props: {
    label: { type: String, default: '' },
    bottomText: { type: String, default: '' },
    value: { type: String, default: '' },
    isInvalid: { type: Boolean, default: false },
    hasAutofocus: { type: Boolean, default: false },
    nativeProps: { type: Object, default: () => ({}) },
  },
  computed: {
    labelFor() {
      return this.nativeProps.id ?? `input-${Math.floor(Math.random() * 10 ** 10)}`;
    },
    isDisabled() {
      return !!this.nativeProps.disabled;
    },
  },
  mounted() {
    if (this.hasAutofocus) this.$refs.uiInput.focus();
  },
};
</script>
<style scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 576px;

  &--invalid {
    .ui-input__bottom-text,
    .ui-input__label {
      color: var(--error);
    }
    .ui-input__input {
      border-color: var(--error);
    }
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}

.ui-input__label {
  @mixin robot-text-two;
  color: var(--superlight);
  margin-bottom: 8px;
}

.ui-input__input {
  @mixin robot-text-two;
  width: 100%;
  margin-bottom: 4px;
  padding: 15px 12px 13px 12px;
  box-sizing: border-box;
  border: 1px solid var(--superlight);
  border-radius: 12px;
}

.ui-input__bottom-text {
  @mixin robot-text-three;
  color: var(--superlight);
  min-height: 20px;
  margin: 0;
  padding: 0;
}
</style>
