<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import usePreferencesStore, { DarkMode } from '@/stores/preferences';
  import { watch, ref, onMounted } from 'vue';
  import { MoonFilledIcon, DevicesIcon, SunFilledIcon } from 'vue-tabler-icons';
  import VRadioSwitch, {
    type RadioOption,
  } from '@/components/VRadioSwitch/VRadioSwitch.vue';

  const preferencesStore = usePreferencesStore();

  const darkMode = ref<DarkMode | null>(null);

  watch(
    () => darkMode.value,
    () => {
      preferencesStore.setDarkMode(darkMode.value);
    },
  );

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
      <VRadioSwitch v-model="darkMode" :options="darkModeOptions" />
    </div>
  </VCard>
</template>
