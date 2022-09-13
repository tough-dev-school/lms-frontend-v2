<template>
  <div class="app-collapsible">
    <UiButtonAsText class="app-collapsible__button" @click="isCollapsed = !isCollapsed">{{ title }}</UiButtonAsText>
    <div class="app-collapsible__content" :class="{ 'app-collapsible__content--collapsed': isCollapsed }">
      <slot />
    </div>
  </div>
</template>
<script>
import UiButtonAsText from "@/components/ui-kit/UiButtonAsText.vue";

export default {
  components: {
    UiButtonAsText,
  },
  props: {
    title: { type: String, required: false, default: "Раскрыть" },
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
  watch: {
    isCollapsed(newValue) {
      if (newValue) {
        this.$emit("closed");
      } else {
        this.$emit("opened");
      }
    },
  },
};
</script>

<style scoped>
.app-collapsible__button {
  margin-bottom: 8px !important;
}
.app-collapsible__content--collapsed {
  display: none;
}
</style>
