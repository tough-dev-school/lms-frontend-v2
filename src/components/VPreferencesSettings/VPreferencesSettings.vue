<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VRadioSwitch from '@/components/VRadioSwitch/VRadioSwitch.vue';
  import { MoonFilledIcon, DevicesIcon, SunFilledIcon } from 'vue-tabler-icons';
  import type { RadioOption } from '@/types/preferences';
  import { DarkMode } from '@/types/preferences';
  import { useColorMode } from '@vueuse/core';

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
  <VCard>
    <VHeading class="mb-24" tag="h2">Настройки темы</VHeading>
    <div class="flex flex-wrap gap-16">
      <VRadioSwitch v-model="store" :options="darkModeOptions" />
    </div>
  </VCard>
</template>
