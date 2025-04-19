<script lang="ts" setup>
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import useUser from '@/stores/user';
  import type { Gender } from '@/types/users';
  import { ref, onMounted } from 'vue';

  const user = useUser();

  const firstName = ref('');
  const lastName = ref('');
  const firstNameEn = ref('');
  const lastNameEn = ref('');
  const gender = ref<Gender>(undefined);

  const update = () => {
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    firstNameEn.value = user.firstNameEn;
    lastNameEn.value = user.lastNameEn;
    gender.value = user.gender;
  };

  const saveCertificate = async () => {
    await user.setData({
      firstName: firstName.value,
      lastName: lastName.value,
      firstNameEn: firstNameEn.value,
      lastNameEn: lastNameEn.value,
      gender: gender.value,
    });
    update();
  };

  onMounted(async () => {
    update();
  });
</script>

<template>
  <VCard title="Данные для диплома">
    <div class="mb-16 rounded bg-yellow bg-opacity-30 p-16">
      Будьте внимательнее, когда заполняете поля имени и фамилии на двух языках.
      Именно в таком виде они отобразятся в сертификате.
    </div>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput v-model="firstName" data-testid="firstName" label="Имя" />
      <VTextInput v-model="lastName" data-testid="lastName" label="Фамилия" />
      <VTextInput
        v-model="firstNameEn"
        data-testid="firstNameEn"
        label="Имя (на английском)" />
      <VTextInput
        v-model="lastNameEn"
        data-testid="lastNameEn"
        label="Фамилия (на английском)" />
      <fieldset class="flex flex-wrap gap-16">
        <legend class="Label">Пол</legend>
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-male"
            :checked="gender === 'male'"
            @click="gender = 'male'" />
          Мужской</label
        >
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            data-testid="gender-female"
            :checked="gender === 'female'"
            @click="gender = 'female'" />
          Женский</label
        >
      </fieldset>
    </div>
    <template #footer>
      <VButton data-testid="save" @click="saveCertificate">Сохранить</VButton>
    </template>
  </VCard>
</template>
