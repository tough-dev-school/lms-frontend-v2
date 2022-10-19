<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import Avatar from './Avatar.vue';
  import { useRouter } from 'vue-router';
  import useUser from '@/stores/user';
  import useAuth from '@/stores/auth';
  import { storeToRefs } from 'pinia';

  const isOpen = ref(false);
  const menu = ref(null);
  const router = useRouter();
  const user = useUser();
  const auth = useAuth();
  const { first_name, last_name, username } = storeToRefs(user);

  onClickOutside(menu, () => (isOpen.value = false));

  const logOut = () => {
    auth.resetAuth();
    router.push({ name: 'login' });
    isOpen.value = false;
  };

  const name = computed(() => `${first_name.value} ${last_name.value}`);
</script>

<template>
  <div class="relative" ref="menu">
    <div
      class="flex cursor-pointer items-center rounded-8 p-8 transition-colors hover:bg-gray hover:bg-opacity-10"
      @click="isOpen = !isOpen"
      data-testid="button">
      <Avatar
        :first-name="first_name"
        :last-name="last_name"
        class="mr-8"
        data-testid="avatar" />
      <ul class="text-sub">
        <li class="leading-tight" data-testid="name">{{ name }}</li>
        <li class="leading-tight text-gray" data-testid="username">
          {{ username }}
        </li>
      </ul>
    </div>
    <Transition name="fade">
      <nav
        class="absolute left-0 right-0 translate-y-8 overflow-hidden rounded-8 bg-white shadow"
        v-if="isOpen"
        data-testid="menu">
        <ul>
          <li>
            <RouterLink
              data-testid="profile"
              :to="{ name: 'profile' }"
              class="ProfileMenu__Item"
              @click="isOpen = false">
              <span class="Link">Профиль</span>
            </RouterLink>
          </li>
          <li v-for="study in user.studies" :key="study.id">
            <RouterLink
              :to="{ name: 'materials', params: { id: study.home_page_slug } }"
              class="ProfileMenu__Item"
              @click="isOpen = false"
              data-testid="material"
              ><span class="Link">{{ study.name }}</span></RouterLink
            >
          </li>
          <li>
            <button
              @click="logOut"
              data-testid="logout"
              class="ProfileMenu__Item">
              <span class="Link">Выйти</span>
            </button>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .ProfileMenu__Item {
    @apply block flex min-h-[32px] w-full cursor-pointer items-center px-8 text-left hover:bg-gray hover:bg-opacity-10;
  }

  .fade {
    &-enter-active,
    &-leave-active {
      transition: all 100ms ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
