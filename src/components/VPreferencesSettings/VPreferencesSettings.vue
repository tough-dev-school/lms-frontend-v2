<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import usePreferencesStore, { DarkMode } from '@/stores/preferences';
  import { watch, ref, onMounted } from 'vue';
  import { MoonFilledIcon, DevicesIcon, SunFilledIcon } from 'vue-tabler-icons';

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
      <div class="flex">
        <label
          class="Radiobutton"
          :class="{ Radiobutton_Active: darkMode === DarkMode.System }">
          <input
            v-model="darkMode"
            type="radio"
            name="darkMode"
            class="visually-hidden"
            :value="DarkMode.System" />
          <DevicesIcon />
          Как в системе
        </label>
        <label
          class="Radiobutton"
          :class="{ Radiobutton_Active: darkMode === DarkMode.Light }">
          <input
            v-model="darkMode"
            type="radio"
            name="darkMode"
            class="visually-hidden"
            :value="DarkMode.Light" />
          <SunFilledIcon />
          Светлая
        </label>
        <label
          class="Radiobutton"
          :class="{ Radiobutton_Active: darkMode === DarkMode.Dark }">
          <input
            v-model="darkMode"
            type="radio"
            name="darkMode"
            class="visually-hidden"
            :value="DarkMode.Dark" />
          <MoonFilledIcon />
          Темная
        </label>
      </div>
    </div>
  </VCard>
</template>

<style scoped>
  .Radiobutton {
    @apply border-y px-8 py-8 gap-4 flex border-gray bg-offwhite cursor-pointer transition-colors;
    @apply first:rounded-l-4 first:border-l last:rounded-r-4 last:border-r;
  }

  .Radiobutton_Active {
    @apply bg-yellow;
  }
</style>
