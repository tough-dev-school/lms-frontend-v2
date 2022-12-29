<script lang="ts" setup>
  import VTextInput from '@/components/VTextInput.vue';
  import VButton from '@/components/VButton.vue';
  import VHeading from '@/components/VHeading.vue';
  import VCard from '@/components/VCard.vue';
  import useUser from '@/stores/user';
  import type { Gender } from '@/types/users';
  import { ref, onMounted } from 'vue';

  const user = useUser();

  const firstName = ref('');
  const lastName = ref('');
  const firstNameEn = ref('');
  const lastNameEn = ref('');
  const gender = ref<Gender>(undefined);

  const update = async () => {
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
    await update();
  };

  onMounted(async () => {
    await update();
  });
</script>

<template>
  <VCard>
    <VHeading class="mb-24" tag="h2">Данные для диплома</VHeading>
    <div class="mb-16 rounded bg-yellow bg-opacity-30 p-16">
      Будьте внимательнее, когда заполняете поля имени и фамилии на двух языках.
      Именно в таком виде они отобразятся в сертификате. И если вы ошибитесь —
      придется заново запускать генерацию сертификата. Хотелось бы этого
      избежать.
    </div>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput label="Имя" v-model="firstName" />
      <VTextInput label="Фамилия" v-model="lastName" />
      <VTextInput label="Имя (на английском)" v-model="firstNameEn" />
      <VTextInput label="Фамилия (на английском)" v-model="lastNameEn" />
      <fieldset class="flex flex-wrap gap-16">
        <legend class="Label">Пол</legend>
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            :checked="gender === 'male'"
            @click="gender = 'male'" />
          Мужской</label
        >
        <label class="cursor-pointer"
          ><input
            type="radio"
            name="gender"
            :checked="gender === 'female'"
            @click="gender = 'female'" />
          Женский</label
        >
      </fieldset>
    </div>
    <template #footer>
      <VButton @click="saveCertificate">Сохранить</VButton>
    </template>
  </VCard>
</template>
