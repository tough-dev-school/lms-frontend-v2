<script lang="ts" setup>
  import VDefaultLayout from '@/layouts/VDefaultLayout/VDefaultLayout.vue';
  import { usePreferredDark } from '@vueuse/core';
  import { computed } from 'vue';
  import usePreferencesStore, { DarkMode } from '@/stores/preferences';

  const isPreferredDark = usePreferredDark();
  const preferencesStore = usePreferencesStore();

  const isDark = computed(() => {
    if (preferencesStore.darkMode === DarkMode.System)
      return isPreferredDark.value;
    else if (preferencesStore.darkMode === DarkMode.Light) return false;
    else if (preferencesStore.darkMode === DarkMode.Dark) return true;
    else return false;
  });
</script>

<template>
  <div :class="{ dark: isDark }" style="height: 100%">
    <div class="body" style="height: 100%">
      <VDefaultLayout>
        <RouterView />
      </VDefaultLayout>
    </div>
  </div>
</template>
