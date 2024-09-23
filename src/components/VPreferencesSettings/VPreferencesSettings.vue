<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VRadioSwitch from '@/components/VRadioSwitch/VRadioSwitch.vue';
  import usePreferencesStore, { DarkMode } from '@/stores/preferences';
  import { computed } from 'vue';
  import { MoonFilledIcon, DevicesIcon, SunFilledIcon } from 'vue-tabler-icons';
  import type { RadioOption } from '@/types/preferences';

  const preferencesStore = usePreferencesStore();

  const darkMode = computed<DarkMode>({
    get: () => preferencesStore.darkMode,
    set: (mode: DarkMode) => preferencesStore.setDarkMode(mode),
  });

  const darkModeOptions: RadioOption[] = [
    {
      value: DarkMode.System,
      label: 'Как в системе',
      icon: DevicesIcon,
    },
    {
      value: DarkMode.Light,
      label: 'Светлая',
      icon: SunFilledIcon,
    },
    {
      value: DarkMode.Dark,
      label: 'Темная',
      icon: MoonFilledIcon,
    },
  ];
</script>

<template>
  <VCard>
    <VHeading class="mb-24" tag="h2">Настройки темы</VHeading>
    <div class="flex flex-wrap gap-16">
      <VRadioSwitch v-model="darkMode" :options="darkModeOptions" />
    </div>
  </VCard>
</template>
