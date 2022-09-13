<template>
  <div class="header-user" @click="menuIsActive = !menuIsActive">
    <AppUserAvatar :user="user" />
    <div class="header-user__container">
      <AppUserName :user="user" />
      <p v-if="email" class="header-user__email" data-test-id="user-email">{{ email }}</p>
    </div>
    <div class="header-user__menu" :class="{ 'header-user__menu--active': menuIsActive }">
      <UiLink
        v-for="course in purchasedCourses"
        :key="course.id"
        class="header-user__link"
        :to="{ name: 'material', params: { page: course.home_page_slug } }"
        >{{ getShortCourseName(course.name) }}</UiLink
      >
      <UiLink class="header-user__link" to="/profile">Профиль</UiLink>
      <UiLink class="header-user__link" href="#" @click.prevent="handleLogout">Выйти</UiLink>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import AppUserAvatar from "@/components/AppUserAvatar";
import AppUserName from "@/components/AppUserName";
import UiLink from "@/components/ui-kit/UiLink.vue";

export default {
  components: {
    AppUserAvatar,
    AppUserName,
    UiLink,
  },
  props: {
    user: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      menuIsActive: false,
    };
  },
  computed: {
    email() {
      return this.user?.email;
    },
    ...mapGetters("auth", ["purchasedCourses"]),
  },
  methods: {
    handleLogout() {
      this.$emit("logout");
    },
    getShortCourseName(longCourseName) {
      return longCourseName.replace(/\(.*\)$/, ""); // flex scope, sorry
    },
  },
};
</script>
<style lang="postcss" scoped>
.header-user {
  position: relative;
  display: flex;
  align-items: center;

  &__link {
    width: 100%;
    height: 32px;
    font-size: 18px;
    margin: 0;
  }
  &__container {
    display: none;
  }
  &__menu {
    position: absolute;
    top: 100%;
    right: 0;
    display: none;
    width: 100%;
    min-width: 250px;
    padding-top: 12px;
    padding-bottom: 6px;
    padding-left: 12px;
    background: var(--background);
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    flex-direction: column;
    &--active {
      display: flex;
    }
  }
}

@media (--after-mobile) {
  .header-user {
    &__container {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    &__email {
      @mixin robot-text-three;
      margin: 0;
      color: var(--superlight);
      line-height: 1;
    }
    &__link {
      font-size: 16px;
      height: 26px;
    }
  }
}
</style>
