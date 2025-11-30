<script lang="ts" setup>
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import { ref, onMounted } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import {
    useUsersMePartialUpdate,
    usersMeRetrieveQueryKey,
    usersMeRetrieveQueryOptions,
  } from '@/api/generated/hooks';
  import { GenderEnum, BlankEnum } from '@/api/generated';
  import type { UsersMePartialUpdateMutationRequest } from '@/api/generated';
  import VError from '@/components/VError/VError.vue';

  const queryClient = useQueryClient();
  const {
    mutateAsync: updateUser,
    isPending,
    error,
  } = useUsersMePartialUpdate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: usersMeRetrieveQueryKey() });
      },
    },
  });

  const data = ref<{
    firstName: Required<UsersMePartialUpdateMutationRequest>['first_name'];
    lastName: Required<UsersMePartialUpdateMutationRequest>['last_name'];
    firstNameEn: Required<UsersMePartialUpdateMutationRequest>['first_name_en'];
    lastNameEn: Required<UsersMePartialUpdateMutationRequest>['last_name_en'];
    gender: Required<UsersMePartialUpdateMutationRequest>['gender'];
  }>({
    firstName: '',
    lastName: '',
    firstNameEn: '',
    lastNameEn: '',
    gender: '' as unknown as BlankEnum,
  });

  const saveCertificate = async () => {
    await updateUser({
      data: {
        first_name: data.value.firstName,
        last_name: data.value.lastName,
        first_name_en: data.value.firstNameEn,
        last_name_en: data.value.lastNameEn,
        gender: data.value.gender,
      },
    });
  };

  onMounted(async () => {
    const user = await queryClient.fetchQuery(usersMeRetrieveQueryOptions());

    data.value = {
      firstName: user.first_name ?? '',
      lastName: user.last_name ?? '',
      firstNameEn: user.first_name_en ?? '',
      lastNameEn: user.last_name_en ?? '',
      gender: user.gender ?? GenderEnum.male,
    };
  });
</script>

<template>
  <VCard title="Данные для диплома">
    <div class="mb-16 rounded bg-yellow bg-opacity-30 p-16">
      Будьте внимательнее, когда заполняете поля имени и фамилии на двух языках.
      Именно в таком виде они отобразятся в сертификате.
    </div>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        v-model="data.firstName"
        name="first_name"
        data-testid="firstName"
        label="Имя"
      />
      <VTextInput
        v-model="data.lastName"
        data-testid="lastName"
        label="Фамилия"
        name="last_name"
      />
      <VTextInput
        v-model="data.firstNameEn"
        data-testid="firstNameEn"
        label="Имя (на английском)"
        name="first_name_en"
      />
      <VTextInput
        v-model="data.lastNameEn"
        data-testid="lastNameEn"
        label="Фамилия (на английском)"
        name="last_name_en"
      />
      <fieldset class="flex flex-wrap gap-16">
        <legend class="Label">Пол</legend>
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-male"
            :checked="data.gender === GenderEnum.male"
            @click="data.gender = GenderEnum.male"
          />
          Мужской</label
        >
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-female"
            :checked="data.gender === GenderEnum.female"
            @click="data.gender = GenderEnum.female"
          />
          Женский</label
        >
      </fieldset>
      <VError
        :error="error"
        :whitelist="['gender']"
      />
      <VError
        :error="error"
        :whitelist="['non_field_errors']"
      />
    </div>
    <template #footer>
      <VButton
        data-testid="save"
        :loading="isPending"
        @click="saveCertificate"
      >
        {{ isPending ? 'Сохраняется...' : 'Сохранить' }}
      </VButton>
    </template>
  </VCard>
</template>
