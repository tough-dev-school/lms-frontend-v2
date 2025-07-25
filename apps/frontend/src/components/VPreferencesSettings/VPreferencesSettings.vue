<script lang="ts" setup>
  import VCard from '@/components/VCard/VCard.vue';
  import VRadioSwitch from '@/components/VRadioSwitch/VRadioSwitch.vue';
import type {RadioOption} from '@/components/VRadioSwitch/VRadioSwitch.vue';
  import { MoonFilledIcon, DevicesIcon, SunFilledIcon } from 'vue-tabler-icons';
  import { useColorMode } from '@vueuse/core';

  enum DarkMode {
    Auto = 'auto',
    Light = 'light',
    Dark = 'dark',
  }

  const darkModeOptions: RadioOption[] = [
    {
      value: DarkMode.Auto,
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

  const { store } = useColorMode();
</script>

<template>
  <VCard title="Настройки темы">
    <div class="flex flex-wrap gap-16">
      <VRadioSwitch v-model="store" :options="darkModeOptions" />
    </div>
  </VCard>
</template>
