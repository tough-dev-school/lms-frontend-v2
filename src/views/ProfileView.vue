<template>
  <AppContainer>
    <h1 class="home__title">Данные для диплома</h1>
    <form v-if="isUserFetched" @submit.prevent="submit">
      <UserDataField has-autofocus label="Имя" name="first_name" />
      <UserDataField label="Фамилия" name="last_name" />
      <UserDataField label="Имя (на английском)" name="first_name_en" />
      <UserDataField label="Фамилия (на английском)" name="last_name_en" />
      <SocialUsernameField label="Ник на GitHub" name="github_username" />
      <SocialUsernameField label="Ник на LinkedIn" name="linkedin_username" />
      <GendeRadioButton class="home__gender" />
      <UiButton :disabled="isUpdating" is-mobile-full-width size="big" color-type="primary">Обновить</UiButton>
    </form>
  </AppContainer>
</template>

<script>
import { mapActions } from "vuex";

import UserDataField from "@/components/Profile/UserDataField";
import SocialUsernameField from "@/components/Profile/SocialUsernameField";
import GendeRadioButton from "@/components/Profile/GendeRadioButton.vue";
import UiButton from "@/components/ui-kit/UiButton.vue";
import AppContainer from "@/components/AppContainer.vue";

export default {
  components: {
    AppContainer,
    GendeRadioButton,
    SocialUsernameField,
    UiButton,
    UserDataField,
  },
  data() {
    return {
      isUserFetched: false,
      isUpdating: false,
    };
  },
  async created() {
    await this.FETCH_USER();
    this.isUserFetched = true;
  },
  methods: {
    ...mapActions("user", ["FETCH_USER", "UPDATE_BACKEND"]),
    async submit() {
      this.isUpdating = true;
      await this.UPDATE_BACKEND();
      this.isUpdating = false;
    },
  },
};
</script>
<style lang="postcss" scoped>
.home__title {
  @mixin inter-title-one;
}
.home__gender {
  margin-bottom: 24px;
}
</style>
