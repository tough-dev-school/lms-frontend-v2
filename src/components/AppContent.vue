<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="app-content" v-html="typographed" />
</template>

<script>
/* eslint-disable no-irregular-whitespace */
import richtypo from '@/utils/richtypo.js';

export default {
  props: {
    html: { type: String, required: true },
  },
  computed: {
    typographed() {
      return richtypo(this.html);
    },
  },
};
</script>

<style>
.app-content {
  li,
  p {
    @mixin robot-text-two;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    @mixin inter-title-three;
  }

  ul {
    list-style: '— ' outside;
    padding-left: 2rem;
  }

  ol {
    list-tyle: decimal outside;
    padding-left: 2rem;
  }

  blockquote {
    margin: 0;
    border-left: 3px solid var(--lightest);
    padding-left: 16px;
  }
}
</style>
