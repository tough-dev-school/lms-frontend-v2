<template>
  <div :class="`header-user__circle header-user__circle--${color}`">
    <p class="header-user__abbreviation">{{ abbreviation }}</p>
  </div>
</template>

<script>
import getUserName from "@/utils/getUserName";

export const AvatarColor = {
  Primary: "primary",
  Secondary: "secondary",
};

export default {
  props: {
    user: { type: Object, required: true },
    color: { type: String, default: AvatarColor.Primary, validator: (val) => Object.values(AvatarColor).includes(val) },
  },
  computed: {
    name() {
      return getUserName(this.user);
    },
    abbreviation() {
      return this.name
        .trim()
        .split(/\s+/)
        .reduce((acc, word) => (acc += word[0]), "")
        .slice(0, 2)
        .toUpperCase();
    },
  },
};
</script>
<style lang="postcss" scoped>
.header-user__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-right: 8px;

  border-radius: 999px;

  &--primary {
    background: var(--basic);
  }
  &--secondary {
    background: var(--large-hover);
  }
}
.header-user__abbreviation {
  @mixin robot-text-default;
  font-size: 12px;
  color: var(--background);
}
</style>
