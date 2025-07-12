<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import { useRouter } from 'vue-router';
  import { useUserQuery } from '@/query';
  import { useAuth } from '@/composables/useAuth';
  import { getName } from '@/utils/getName';

  export interface ProfileMenuItem {
    label: string;
    action: () => void;
    isHidden?: boolean;
    id: string;
  }

  const isOpen = ref(false);
  const menu = ref(null);
  const router = useRouter();
  const { data: user } = useUserQuery();
  const { handleLogout } = useAuth();

  onClickOutside(menu, () => (isOpen.value = false));

  const hasCertificateData = computed(
    () =>
      !!user.value?.first_name &&
      !!user.value?.last_name &&
      !!user.value?.first_name_en &&
      !!user.value?.last_name_en,
  );

  const handleItemClick = (action: () => void) => {
    action();
    isOpen.value = false;
  };

  const menuItems = computed<ProfileMenuItem[]>(() => [
    {
      label: 'На главную',
      action: () => {
        router.push({ name: 'home' });
      },
      id: 'home',
    },
    {
      label: 'Сертификаты',
      action: () => {
        router.push({ name: 'certificates' });
      },
      id: 'certificates',
    },
    {
      label: 'Настройки',
      action: () => {
        router.push({ name: 'settings' });
      },
      id: 'settings',
    },
    {
      label: 'Добавьте данные для диплома',
      action: () => {
        router.push({ name: 'settings', hash: '#certificate' });
      },
      isHidden: hasCertificateData.value,
      id: 'certificate',
    },
    {
      label: 'Выйти',
      action: () => {
        handleLogout();
        router.push({ name: 'login' });
        isOpen.value = false;
      },
      id: 'logout',
    },
  ]);

  const fullName = computed(() =>
    getName(user.value?.first_name, user.value?.last_name),
  );
</script>

<template>
  <div ref="menu" class="relative">
    <div class="flex items-center gap-8">
      <button
        class="flex items-center gap-8 rounded-8 p-8 hover:bg-gray hover:bg-opacity-10"
        :class="{ VProfileMenu__Button_Active: isOpen }"
        data-testid="button"
        @click="isOpen = !isOpen">
        <VAvatar
          :user-id="user?.uuid ?? ''"
          :image="user?.avatar || undefined"
          data-testid="avatar" />
        <ul class="flex flex-col items-start">
          <li class="text-black dark:text-white" data-testid="name">
            {{ fullName }}
          </li>
          <li class="text-sub text-gray" data-testid="username">
            {{ user?.username }}
          </li>
        </ul>
      </button>
    </div>
    <Transition name="fade">
      <nav
        v-if="isOpen"
        class="float-card absolute right-0 z-10 translate-y-8"
        data-testid="menu">
        <ul>
          <li
            v-for="item in menuItems.filter((item) => !item.isHidden)"
            :key="item.id">
            <button
              class="VProfileMenu__Item"
              :data-testid="item.id"
              @click="handleItemClick(item.action)">
              <span>{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>

<style scoped>
  .VProfileMenu__Button_Active {
    @apply bg-gray bg-opacity-10;
  }
  .VProfileMenu__Item {
    @apply flex min-h-[32px] w-full cursor-pointer items-center whitespace-nowrap px-8 text-left hover:bg-gray hover:bg-opacity-10;
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
