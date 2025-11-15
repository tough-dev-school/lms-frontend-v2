<script lang="ts" setup>
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import { ref, onMounted } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useUpdateUserMutation, fetchUser } from '@/query';
  import { GenderEnum, BlankEnum } from '@/api/generated/generated-api';
  import type { PatchedUser } from '@/api/generated/generated-api';

  const queryClient = useQueryClient();
  const { mutateAsync: updateUser, isPending } =
    useUpdateUserMutation(queryClient);

  const data = ref<{
    firstName: Required<PatchedUser>['first_name'];
    lastName: Required<PatchedUser>['last_name'];
    firstNameEn: Required<PatchedUser>['first_name_en'];
    lastNameEn: Required<PatchedUser>['last_name_en'];
    gender: Required<PatchedUser>['gender'];
  }>({
    firstName: '',
    lastName: '',
    firstNameEn: '',
    lastNameEn: '',
    gender: BlankEnum.Value,
  });

  const saveCertificate = async () => {
    await updateUser({
      first_name: data.value.firstName,
      last_name: data.value.lastName,
      first_name_en: data.value.firstNameEn,
      last_name_en: data.value.lastNameEn,
      gender: data.value.gender,
    });
  };

  onMounted(async () => {
    const user = await fetchUser(queryClient);

    data.value = {
      firstName: user.first_name ?? '',
      lastName: user.last_name ?? '',
      firstNameEn: user.first_name_en ?? '',
      lastNameEn: user.last_name_en ?? '',
      gender: user.gender ?? GenderEnum.Male,
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
        data-testid="firstName"
        label="Имя"
      />
      <VTextInput
        v-model="data.lastName"
        data-testid="lastName"
        label="Фамилия"
      />
      <VTextInput
        v-model="data.firstNameEn"
        data-testid="firstNameEn"
        label="Имя (на английском)"
      />
      <VTextInput
        v-model="data.lastNameEn"
        data-testid="lastNameEn"
        label="Фамилия (на английском)"
      />
      <fieldset class="flex flex-wrap gap-16">
        <legend class="Label">Пол</legend>
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-male"
            :checked="data.gender === GenderEnum.Male"
            @click="data.gender = GenderEnum.Male"
          />
          Мужской</label
        >
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-female"
            :checked="data.gender === GenderEnum.Female"
            @click="data.gender = GenderEnum.Female"
          />
          Женский</label
        >
      </fieldset>
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
