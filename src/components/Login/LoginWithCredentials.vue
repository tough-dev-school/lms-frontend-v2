<template>
  <form class="login-form" @submit.prevent="submit">
    <UiInput
      :native-props="{
        id: 'login',
        type: 'text',
        autofocus: true,
      }"
      :is-invalid="isError"
      has-autofocus
      label="Логин"
      class="login-form__input"
      :value="username"
      @input="handleLoginInput" />
    <UiInput
      :native-props="{
        id: 'password',
        type: 'password',
      }"
      :is-invalid="isError"
      :value="password"
      label="Пароль"
      class="login-form__input"
      @input="handlePasswordInput" />
    <ul class="login-form__nav-list">
      <li>
        <UiButton :disabled="isButtonSendDisabled" size="big" color-type="primary" is-mobile-full-width>Войти</UiButton>
      </li>
      <li>
        <UiLink class="login-form__link" href="#" @click.prevent="$emit('showPasswordlessForm')"> Войти по ссылке </UiLink>
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
  data() {
    return {
      username: null,
      password: null,
      isError: false,
    };
  },
  computed: {
    isButtonSendDisabled() {
      const { isError, username, password } = this;
      return isError || !username || !password;
    },
  },
  watch: {
    username() {
      this.isError = false;
    },
    password() {
      this.isError = false;
    },
  },
  methods: {
    ...mapActions('auth', ['LOGIN_WITH_CREDENTIALS']),
    handleLoginInput({ target }) {
      this.username = target.value;
    },
    handlePasswordInput({ target }) {
      this.password = target.value;
    },
    async submit() {
      const { username, password } = this;

      this.isError = false;

      try {
        await this.LOGIN_WITH_CREDENTIALS({ username, password });
      } catch (error) {
        this.isError = true;
        throw error; // let sentry log it
      }
      this.isSending = false;
    },
  },
};
</script>
<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
}
.login-form__input:last-of-type {
  margin-bottom: 32px;
}
.login-form__nav-list {
  li {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }
}
@media (--after-mobile) {
  .login-form__nav-list {
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
