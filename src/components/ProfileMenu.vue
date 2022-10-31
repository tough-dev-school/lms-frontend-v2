<script lang="ts" setup>
  import { ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import Avatar from './Avatar.vue';
  import { useRouter } from 'vue-router';
  import useUser from '@/stores/user';
  import useAuth from '@/stores/auth';
  import useStudies from '@/stores/studies';
  import { storeToRefs } from 'pinia';

  const isOpen = ref(false);
  const menu = ref(null);
  const router = useRouter();
  const user = useUser();
  const auth = useAuth();
  const studies = useStudies();
  const { firstName, lastName, username, name } = storeToRefs(user);

  onClickOutside(menu, () => (isOpen.value = false));

  const clearStudyName = (name: string) => {
    const reg = /\(.*\)/;
    return name.replace(reg, '').trim();
  };

  const logOut = () => {
    auth.resetAuth();
    router.push({ name: 'login' });
    isOpen.value = false;
  };
</script>

<template>
  <div class="relative" ref="menu">
    <div
      class="flex cursor-pointer items-center rounded-8 p-8 transition-colors hover:bg-gray hover:bg-opacity-10"
      @click="isOpen = !isOpen"
      data-testid="button">
      <Avatar
        :first-name="firstName"
        :last-name="lastName"
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
        class="absolute right-0 z-10 translate-y-8 overflow-hidden rounded-8 bg-white shadow"
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
          <li v-for="study in studies.items" :key="study.id">
            <RouterLink
              :to="{ name: 'materials', params: { id: study.homePageSlug } }"
              class="ProfileMenu__Item"
              @click="isOpen = false"
              data-testid="material"
              ><span class="Link">{{
                clearStudyName(study.name)
              }}</span></RouterLink
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

<style scoped>
  .ProfileMenu__Item {
    @apply block flex min-h-[32px] w-full cursor-pointer items-center whitespace-nowrap px-8 text-left hover:bg-gray hover:bg-opacity-10;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 100ms ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
