<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import { useRouter } from 'vue-router';
  import useUser from '@/stores/user';
  import useAuth from '@/stores/auth';
  import useStudies from '@/stores/studies';
  import { storeToRefs } from 'pinia';

  export interface ProfileMenuItem {
    label: string;
    action: () => void;
    isHidden?: boolean;
    id: string;
  }

  const isOpen = ref(false);
  const menu = ref(null);
  const router = useRouter();
  const user = useUser();
  const auth = useAuth();
  const studies = useStudies();
  const { username, name, uuid: userId } = storeToRefs(user);

  onClickOutside(menu, () => (isOpen.value = false));

  const hasCertificateData = computed(
    () =>
      !!user.firstName &&
      !!user.lastName &&
      !!user.firstNameEn &&
      !!user.lastNameEn,
  );

  const studiesAsMenuItems = computed<ProfileMenuItem[]>(() => {
    return studies.items.slice(0, 3).map((study) => {
      return {
        label: study.name.replace(/\(.*\)/, '').trim(),
        action: () => {
          router.push({
            name: 'materials',
            params: { id: study.homePageSlug },
          });
        },
        id: `material-${study.id}`,
      };
    });
  });

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
    ...studiesAsMenuItems.value,
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
        auth.resetAuth();
        router.push({ name: 'login' });
        isOpen.value = false;
      },
      id: 'logout',
    },
  ]);
</script>

<template>
  <div ref="menu" class="relative">
    <div
      class="flex cursor-pointer items-center rounded-8 p-8 transition-colors hover:bg-gray hover:bg-opacity-10"
      :class="{ VProfileMenu__Button_Active: isOpen }"
      data-testid="button"
      @click="isOpen = !isOpen">
      <VAvatar :user-id="userId" class="mr-8" data-testid="avatar" />
      <ul class="text-sub">
        <li class="leading-tight" data-testid="name">{{ name }}</li>
        <li class="leading-tight text-gray" data-testid="username">
          {{ username }}
        </li>
      </ul>
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
              <span class="link">{{ item.label }}</span>
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
    @apply flex min-h-[2em] w-full cursor-pointer items-center whitespace-nowrap px-8 text-left hover:bg-gray hover:bg-opacity-10;
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
