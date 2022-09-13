<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    next() {
      const { redirectAfterLogin } = this.$store.state.auth;
      return redirectAfterLogin ? redirectAfterLogin : "/";
    },
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  async mounted() {
    if (this.isAuthenticated) {
      this.$router.push(this.next);
      return;
    }

    const { token } = this.$route.params;

    try {
      await this.EXCHANGE_PASSWORDLESS_TOKEN_TO_JWT({ passwordlessToken: token });
    } catch (error) {
      this.$router.push({
        name: "Login",
        query: { error: "invalidToken" },
      });
      throw error;
    }

    this.$router.push(this.next);
  },
  destroyed() {
    this.SET_REDIRECT_AFTER_LOGIN(null);
  },
  methods: {
    ...mapActions("auth", ["EXCHANGE_PASSWORDLESS_TOKEN_TO_JWT"]),
    ...mapMutations("auth", ["SET_REDIRECT_AFTER_LOGIN"]),
  },
  render() {
    return "";
  },
};
</script>
