<template>
  <span v-if="error" class="app-http-error">{{ error }}</span>
</template>

<script>
export default {
  props: {
    exception: { type: Object, required: true },
  },
  computed: {
    error() {
      return `${this.exception.response?.status}: ${this.exception.response?.statusText}`;
    },
  },
};
</script>
