<template>
  <AppContainer class="app-header" tag="header">
    <section class="app-header__container">
      <AppHeaderUser class="app-header__user-block" :user="user" @logout="logout" />
    </section>
  </AppContainer>
</template>
<script>
import { mapMutations, mapState } from 'vuex';

import AppHeaderUser from '@/components/AppHeaderUser.vue';
import AppContainer from '@/components/AppContainer.vue';

export default {
  components: {
    AppContainer,
    AppHeaderUser,
  },
  computed: mapState('auth', ['user']),
  methods: {
    ...mapMutations('auth', ['RESET']),
    logout() {
      this.RESET();
      this.$router.push({
        name: 'Login',
        query: { next: this.$route.fullPath },
      });
    },
  },
};
</script>
<style lang="postcss" scoped>
.app-header {
  display: flex;
  width: 100%;
  position: relative;
  &__container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 10px;
  }
  &__user-block {
    margin-right: 16px;
  }
}
</style>
