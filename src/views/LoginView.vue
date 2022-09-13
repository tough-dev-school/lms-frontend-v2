<template>
  <div class="login">
    <h1 class="login__title">Вход и регистрация</h1>
    <LoginPasswordless v-if="loginType == 'passwordless'" :error="error" @showCredentialsForm="loginType = 'credentials'" />
    <LoginWithCredentials v-else @showPasswordlessForm="loginType = 'passwordless'" />
  </div>
</template>

<script>
import LoginPasswordless from "@/components/Login/LoginPasswordless.vue";
import LoginWithCredentials from "@/components/Login/LoginWithCredentials.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    LoginPasswordless,
    LoginWithCredentials,
  },
  data() {
    return {
      loginType: "passwordless",
      isSubmitted: false,
    };
  },
  computed: {
    next() {
      const { redirectAfterLogin } = this.$store.state.auth;
      return redirectAfterLogin ? redirectAfterLogin : "/";
    },
    error() {
      const ERRORS = {
        invalidToken: "Кажется, вы перешли по устаревшей ссылке. Попробуйте заново",
      };
      const { error } = this.$route.query;
      return error && error in ERRORS ? ERRORS[error] : null;
    },
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  watch: {
    isAuthenticated(isAuthenticated) {
      if (isAuthenticated) {
        this.$router.push(this.next);
      }
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push(this.next);
      return;
    }
  },
  mounted() {
    let { next } = this.$route.query;
    next = next ? next : null;

    this.SET_REDIRECT_AFTER_LOGIN(next);
  },
  methods: mapMutations("auth", ["SET_REDIRECT_AFTER_LOGIN"]),
};
</script>

<style scoped>
.login {
  margin: 0 auto;
}
.login__title {
  @mixin inter-title-one;
  margin: 0;
  margin-bottom: 64px;
}
@media (--after-mobile) {
  .login {
    width: 100%;
    max-width: 576px;
    margin-top: 10vh;
  }
}
</style>
