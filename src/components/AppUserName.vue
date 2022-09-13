<template>
  <p v-if="name" :class="`user-name user-name--font-${font} user-name--color-${color}`">{{ name }}</p>
</template>

<script>
import getUserName from "../utils/getUserName";
export const FontType = {
  Robot: "robot",
  Inter: "inter",
};
export const ColorType = {
  Primary: "primary",
  Secondary: "secondary",
};

export default {
  props: {
    user: { type: Object, required: true },
    font: { type: String, default: FontType.Robot, validator: (val) => Object.values(FontType).includes(val) },
    color: { type: String, default: ColorType.Primary, validator: (val) => Object.values(ColorType).includes(val) },
  },
  computed: {
    name() {
      return getUserName(this.user);
    },
  },
};
</script>
<style lang="postcss" scoped>
.user-name {
  &--font-inter {
    @mixin inter-title-three;
    line-height: 1;
    margin: 0;
  }
  &--font-robot {
    @mixin robot-text-two;
    line-height: 1;
    margin: 0;
  }
  &--color-primary {
    color: var(--basic);
  }
  &--color-secondary {
    color: var(--large-hover);
  }
}
</style>
