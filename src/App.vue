<script lang="ts" setup>
  import { computed } from 'vue';
  import VDefaultLayout from '@/layouts/VDefaultLayout/VDefaultLayout.vue';
  import usePreferencesStore from '@/stores/preferences';

  const preferencesStore = usePreferencesStore();
  const isDark = computed(() => preferencesStore.isDark);
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
