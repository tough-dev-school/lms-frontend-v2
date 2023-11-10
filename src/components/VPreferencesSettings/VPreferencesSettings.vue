<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import usePreferencesStore, { DarkMode } from '@/stores/preferences';
  import { watch, ref, onMounted } from 'vue';

  const preferencesStore = usePreferencesStore();

  const darkMode = ref<DarkMode | null>(null);

  watch(
    () => darkMode.value,
    () => {
      preferencesStore.setDarkMode(darkMode.value);
    },
  );

  onMounted(() => {
    darkMode.value = preferencesStore.darkMode;
  });
</script>

<template>
  <VCard>
    <VHeading class="mb-24" tag="h2">Настройки</VHeading>
    <!-- # TODO Add unified input wrapper-->
    <div class="flex flex-wrap gap-16">
      <div class="w-full">Темная тема</div>
      <label>
        <input
          v-model="darkMode"
          type="radio"
          name="darkMode"
          :value="DarkMode.System" />
        Как в системе
      </label>
      <label>
        <input
          v-model="darkMode"
          type="radio"
          name="darkMode"
          :value="DarkMode.Light" />
        Светлая
      </label>
      <label>
        <input
          v-model="darkMode"
          type="radio"
          name="darkMode"
          :value="DarkMode.Dark" />
        Темная
      </label>
    </div>
  </VCard>
</template>
