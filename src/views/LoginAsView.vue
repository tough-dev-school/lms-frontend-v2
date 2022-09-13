<script>
import { mapActions } from 'vuex';
export default {
  computed: {
    next() {
      const { redirectAfterLogin } = this.$store.state.auth;
      return redirectAfterLogin ? redirectAfterLogin : '/';
    },
  },
  async created() {
    const { id } = this.$route.params;
    await this.LOGIN_WITH_USER_ID({ id });
    this.$router.push(this.next);
  },
  methods: mapActions('auth', ['LOGIN_WITH_USER_ID']),
  render() {
    return '';
  },
};
</script>
