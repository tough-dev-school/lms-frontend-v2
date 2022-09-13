<template>
  <form class="login-passwordless" @submit.prevent="submit">
    <UiInput
      :native-props="{
        id: 'email',
        type: 'text',
      }"
      :value="email"
      :is-invalid="!!error"
      :bottom-text="inputButtonText"
      has-autofocus
      label="Электронная почта"
      class="login-passwordless__input"
      @input="handleInput" />
    <ul class="login-passwordless__nav-list">
      <li>
        <UiButton :disabled="isButtonSendDisabled" size="big" color-type="primary" is-mobile-full-width>Получить доступ</UiButton>
      </li>
      <li>
        <UiLink class="login-passwordless__password-link" href="#" @click.prevent="$emit('showCredentialsForm')">
          Войти через пароль
        </UiLink>
      </li>
    </ul>
  </form>
</template>
<script>
import { mapActions } from 'vuex';

import UiButton from '@/components/ui-kit/UiButton.vue';
import UiInput from '@/components/ui-kit/UiInput.vue';
import UiLink from '@/components/ui-kit/UiLink.vue';

export default {
  components: {
    UiButton,
    UiInput,
    UiLink,
  },
  props: {
    error: { type: [String, null], default: null },
  },
  data() {
    return {
      email: null,
      isSubmitted: false,
      isSending: false,
    };
  },
  computed: {
    inputButtonText() {
      return this.error ?? 'Мы отправим ссылку для входа по этому адресу';
    },
    isButtonSendDisabled() {
      const { isSubmitted, isSending, email } = this;
      return !email || isSubmitted || isSending;
    },
  },
  watch: {
    email() {
      this.isSubmitted = false;
      this.isSending = false;
    },
  },
  methods: {
    ...mapActions('auth', ['REQUEST_PASSWORDLESS_TOKEN']),
    handleInput({ target }) {
      this.email = target.value;
    },
    async submit() {
      this.isSending = true;
      const email = this.email.trim();
      try {
        this.$router.push({ name: 'LoginPasswordlessSuccess', query: { email } });
        await this.REQUEST_PASSWORDLESS_TOKEN({ email });
      } catch (error) {
        this.isSending = false;
        throw error;
      }
      this.isSubmitted = true;
    },
  },
};
</script>
<style scoped>
.login-passwordless {
  display: flex;
  flex-direction: column;
}
.login-passwordless__input {
  margin-bottom: 32px;
}
.login-passwordless__nav-list {
  li {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }
}
@media (--after-mobile) {
  .login-passwordless__nav-list {
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      margin-bottom: 0;

      &:last-child {
        flex-grow: 1;
      }
    }
  }
}
</style>
