<template>
  <div class="mail-sent">
    <p class="mail-sent__text">
      Мы отправили ссылку для авторизации по адресу <a :href="email" class="mail-sent__email">{{ email }}</a>
    </p>
    <ul class="mail-sent__nav-list">
      <li>
        <UiButton :disabled="isSending" size="big" color-type="white" is-mobile-full-width>Отправить еще раз</UiButton>
      </li>
      <li>
        <UiLink :to="{ name: 'Login' }" class="mail-sent__link">На другую почту</UiLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import UiButton from '@/components/ui-kit/UiButton.vue';
import UiLink from '@/components/ui-kit/UiLink.vue';

export default {
  components: {
    UiButton,
    UiLink,
  },
  data: () => ({
    isSending: false,
  }),
  computed: {
    email() {
      return this.$route.query.email;
    },
  },
  mounted() {
    if (!this.email) this.$router.push({ name: 'Login' });
  },
  methods: {
    ...mapActions('auth', ['REQUEST_PASSWORDLESS_TOKEN']),
    async handleResend() {
      const { email } = this;
      this.isSending = true;
      try {
        await this.REQUEST_PASSWORDLESS_TOKEN({ email });
      } catch (error) {
        this.isSending = false;
        throw error;
      }
    },
  },
};
</script>

<style scoped>
.mail-sent {
  margin: 0 auto;
  margin-top: 20vh;
}
.mail-sent__text {
  @mixin robot-text-one;
  margin: 0;
  margin-bottom: 56px;
  text-align: center;
}
.mail-sent__email {
  color: var(--large);
  text-decoration: none;
}
.mail-sent__link {
}
.mail-sent__nav-list li {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

@media (--after-mobile) {
  .mail-sent {
    width: 100%;
    max-width: 800px;
    margin-top: 10vh;
  }
}
</style>
