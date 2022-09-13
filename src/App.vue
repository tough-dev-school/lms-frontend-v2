<template>
  <div id="app">
    <AppHeader v-if="isAuthenticated" />
    <main class="container" :class="{ 'container--auth-pages': !isAuthenticated }">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import AppHeader from '@/components/AppHeader.vue';

export default {
  components: {
    AppHeader,
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapState('auth', ['user']),
  },
};
</script>
<style lang="postcss" scoped>
.container {
  display: flex;
  padding-left: 4%;
  padding-right: 4%;
  padding-top: 32px;
  padding-bottom: 64px;

  &--auth-pages {
    padding-top: 8%;
  }
}

@media (--after-mobile) {
  .container {
    padding-bottom: 32px;
  }
}
</style>
