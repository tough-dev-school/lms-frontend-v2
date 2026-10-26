<script lang="ts" setup>
  import { useForm, usePage } from '@inertiajs/vue3';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import { GenderEnum } from '@/api/generated';
  import VError from '@/components/VError/VError.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const page = usePage();
  const user = page.props.user;

  const form = useForm({
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    first_name_en: user?.first_name_en ?? '',
    last_name_en: user?.last_name_en ?? '',
    gender: user?.gender ?? GenderEnum.male,
  });

  const saveCertificate = () => {
    form.patch('/settings/profile', { preserveScroll: true });
  };
</script>

<template>
  <VCard :title="t('settings.certificate')">
    <div class="mb-16 rounded bg-yellow bg-opacity-30 p-16">
      {{ t('certificateSettings.warning') }}
    </div>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        v-model="form.first_name"
        name="first_name"
        :error="form.errors"
        data-testid="firstName"
        :label="t('certificateSettings.firstName')"
      />
      <VTextInput
        v-model="form.last_name"
        data-testid="lastName"
        :label="t('certificateSettings.lastName')"
        name="last_name"
        :error="form.errors"
      />
      <VTextInput
        v-model="form.first_name_en"
        data-testid="firstNameEn"
        :label="t('certificateSettings.firstNameEn')"
        name="first_name_en"
        :error="form.errors"
      />
      <VTextInput
        v-model="form.last_name_en"
        data-testid="lastNameEn"
        :label="t('certificateSettings.lastNameEn')"
        name="last_name_en"
        :error="form.errors"
      />
      <fieldset class="flex flex-wrap gap-16">
        <legend class="Label">{{ t('certificateSettings.gender') }}</legend>
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-male"
            :checked="form.gender === GenderEnum.male"
            @click="form.gender = GenderEnum.male"
          />
          {{ t('certificateSettings.male') }}</label
        >
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-female"
            :checked="form.gender === GenderEnum.female"
            @click="form.gender = GenderEnum.female"
          />
          {{ t('certificateSettings.female') }}</label
        >
      </fieldset>
      <VError
        :error="form.errors"
        :whitelist="['gender']"
      />
      <VError
        :error="form.errors"
        :whitelist="['non_field_errors']"
      />
    </div>
    <template #footer>
      <VButton
        data-testid="save"
        :loading="form.processing"
        @click="saveCertificate"
      >
        {{ form.processing ? t('common.saving') : t('common.save') }}
      </VButton>
    </template>
  </VCard>
</template>
