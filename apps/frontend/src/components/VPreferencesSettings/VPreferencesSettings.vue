<script lang="ts" setup>
  import VCard from '@/components/VCard/VCard.vue';
  import VRadioSwitch from '@/components/VRadioSwitch/VRadioSwitch.vue';
  import VSelect from '@/components/VSelect/VSelect.vue';
  import type { SelectOption } from '@/components/VSelect/VSelect.vue';
  import type { RadioOption } from '@/components/VRadioSwitch/VRadioSwitch.vue';
  import {
    IconMoonFilled,
    IconDevices,
    IconSunFilled,
  } from '@tabler/icons-vue';
  import { useColorMode } from '@vueuse/core';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useLocale } from '@/composables/useLocale';
  import { isLocale } from '@/i18n';

  enum DarkMode {
    Auto = 'auto',
    Light = 'light',
    Dark = 'dark',
  }

  const { t } = useI18n();

  const darkModeOptions = computed<RadioOption[]>(() => [
    {
      value: DarkMode.Auto,
      label: t('preferences.themeAuto'),
      icon: IconDevices,
    },
    {
      value: DarkMode.Light,
      label: t('preferences.themeLight'),
      icon: IconSunFilled,
    },
    {
      value: DarkMode.Dark,
      label: t('preferences.themeDark'),
      icon: IconMoonFilled,
    },
  ]);

  // Language names stay in their own language, so people can find theirs in any locale.
  // Emoji flags because a native select can't show images; Windows draws them as letters (RU, GB)
  const localeOptions: SelectOption[] = [
    { value: 'ru', label: '🇷🇺 Русский' },
    { value: 'en', label: '🇬🇧 English' },
  ];

  const { store } = useColorMode();
  const { locale } = useLocale();

  const setLocale = (value: string) => {
    if (isLocale(value)) locale.value = value;
  };
</script>

<template>
  <VCard :title="t('settings.preferences')">
    <div class="flex flex-col gap-16">
      <div class="flex flex-col gap-8">
        <span>{{ t('preferences.theme') }}</span>
        <div class="flex flex-wrap gap-16">
          <VRadioSwitch
            v-model="store"
            data-testid="theme"
            :options="darkModeOptions"
          />
        </div>
      </div>
      <div class="phone:max-w-[320px]">
        <VSelect
          name="language"
          data-testid="language"
          :label="t('preferences.language')"
          :model-value="locale"
          :options="localeOptions"
          @update:model-value="setLocale"
        />
      </div>
    </div>
  </VCard>
</template>
