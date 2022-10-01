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
    router.push('/login');
  };

  const name = computed(() => `${first_name.value} ${last_name.value}`);
</script>

<template>
  <div class="relative">
    <div
      class="flex cursor-pointer items-center rounded p-8 transition-colors hover:bg-gray hover:bg-opacity-10"
      @click="isOpen = true">
      <Avatar :name="first_name" :surname="last_name" class="mr-8" />
      <ul class="text-sub">
        <li class="leading-tight">{{ name }}</li>
        <li class="leading-tight text-gray">{{ username }}</li>
      </ul>
    </div>
    <nav
      class="absolute left-0 right-0 bg-white shadow"
      v-if="isOpen"
      ref="menu">
      <ul>
        <li>
          <RouterLink to="/profile" class="Link px-8 py-4 leading-tight"
            >Профиль</RouterLink
          >
        </li>
        <li>
          <button @click="logOut" class="Link px-8 py-4 leading-tight">
            Выйти
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
