<script lang="ts" setup>
  import { ref, computed, useTemplateRef } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import { router, usePage } from '@inertiajs/vue3';
  import { urls } from '@/urls';
  import { getName } from '@/utils/getName';
  import { useLandingUrl } from '@/composables/useLandingUrl';
  import { useI18n } from 'vue-i18n';

  export interface ProfileMenuItem {
    label: string;
    action: () => void;
    isHidden?: boolean;
    id: string;
  }

  const isOpen = ref(false);
  const menu = useTemplateRef('menu');
  const { t } = useI18n();
  const page = usePage();
  const user = computed(() => page.props.user);
  const landingUrl = useLandingUrl();

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
      label: t('profileMenu.home'),
      action: () => {
        router.visit(urls.courses());
      },
      id: 'home',
    },
    {
      label: t('profileMenu.website'),
      action: () => {
        window.open(landingUrl.value, '_blank');
      },
      id: 'website',
    },
    {
      label: t('profileMenu.certificates'),
      action: () => {
        router.visit(urls.certificates());
      },
      id: 'certificates',
    },
    {
      label: t('profileMenu.settings'),
      action: () => {
        router.visit(urls.settings());
      },
      id: 'settings',
    },
    {
      label: t('profileMenu.addCertificateData'),
      action: () => {
        router.visit(urls.settings('certificate'));
      },
      isHidden: hasCertificateData.value,
      id: 'certificate',
    },
    {
      label: t('profileMenu.logout'),
      action: () => {
        router.post(urls.logout());
      },
      id: 'logout',
    },
  ]);

  const fullName = computed(() =>
    getName({
      firstName: user.value?.first_name,
      lastName: user.value?.last_name,
      randomName: user.value?.random_name,
    }),
  );
</script>

<template>
  <div
    ref="menu"
    class="relative ms-auto min-w-0"
  >
    <div class="flex items-center gap-8">
      <button
        class="flex max-w-full items-center gap-8 rounded-8 px-16 py-8 hover:bg-gray hover:bg-opacity-10"
        :class="{ VProfileMenu__Button_Active: isOpen }"
        data-testid="button"
        @click="isOpen = !isOpen"
      >
        <VAvatar
          :user-id="user?.uuid ?? ''"
          :image="user?.avatar || undefined"
          data-testid="avatar"
        />
        <ul class="flex min-w-0 flex-col items-start">
          <li
            class="max-w-full truncate text-black dark:text-white"
            data-testid="name"
          >
            {{ fullName }}
          </li>
          <li
            class="max-w-full truncate text-sub text-gray"
            data-testid="username"
          >
            {{ user?.username }}
          </li>
        </ul>
      </button>
    </div>
    <Transition name="fade">
      <nav
        v-if="isOpen"
        class="float-card absolute right-0 z-10 min-w-full translate-y-8"
        data-testid="menu"
      >
        <ul>
          <li
            v-for="item in menuItems.filter((item) => !item.isHidden)"
            :key="item.id"
          >
            <button
              class="VProfileMenu__Item"
              :data-testid="item.id"
              @click="handleItemClick(item.action)"
            >
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
    @apply flex min-h-[32px] w-full cursor-pointer items-center whitespace-nowrap px-[20px] py-8 text-left hover:bg-gray hover:bg-opacity-10;
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
