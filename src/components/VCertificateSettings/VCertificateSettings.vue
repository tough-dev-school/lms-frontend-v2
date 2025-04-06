<script lang="ts" setup>
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import type { Gender } from '@/types/users';
  import { ref, onBeforeMount } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import { fetchUserQuery, useUpdateUserMutation } from '@/query';

  const queryClient = useQueryClient();

  const data = ref<{
    firstName: string;
    lastName: string;
    firstNameEn: string;
    lastNameEn: string;
    gender: Gender;
  }>({
    firstName: '',
    lastName: '',
    firstNameEn: '',
    lastNameEn: '',
    gender: undefined,
  });

  const { mutateAsync: updateUser } = useUpdateUserMutation();

  onBeforeMount(async () => {
    const currentUserData = await fetchUserQuery(queryClient);
    data.value = currentUserData;
  });
</script>

<template>
  <VCard>
    <VHeading class="mb-24" tag="h2">Данные для диплома</VHeading>
    <div class="mb-16 rounded bg-yellow bg-opacity-30 p-16">
      Будьте внимательнее, когда заполняете поля имени и фамилии на двух языках.
      Именно в таком виде они отобразятся в сертификате.
    </div>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        v-model="data.firstName"
        data-testid="firstName"
        label="Имя" />
      <VTextInput
        v-model="data.lastName"
        data-testid="lastName"
        label="Фамилия" />
      <VTextInput
        v-model="data.firstNameEn"
        data-testid="firstNameEn"
        label="Имя (на английском)" />
      <VTextInput
        v-model="data.lastNameEn"
        data-testid="lastNameEn"
        label="Фамилия (на английском)" />
      <fieldset class="flex flex-wrap gap-16">
        <legend class="Label">Пол</legend>
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-male"
            :checked="data.gender === 'male'"
            @click="data.gender = 'male'" />
          Мужской</label
        >
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-female"
            :checked="data.gender === 'female'"
            @click="data.gender = 'female'" />
          Женский</label
        >
      </fieldset>
    </div>
    <template #footer>
      <VButton data-testid="save" @click="updateUser">Сохранить</VButton>
    </template>
  </VCard>
</template>
