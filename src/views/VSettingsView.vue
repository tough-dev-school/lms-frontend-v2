<script lang="ts" setup>
  import VTextInput from '@/components/VTextInput.vue';
  import VButton from '@/components/VButton.vue';
  import VHeading from '@/components/VHeading.vue';
  import { onMounted, ref } from 'vue';
  import type { Ref } from 'vue';
  import useUser from '@/stores/user';
  import type { Gender } from '@/types/users';
  import VCard from '@/components/VCard.vue';
  import VLoginChange from '@/components/VLoginChange.vue';

  const user = useUser();
  const firstName = ref('');
  const lastName = ref('');
  const firstNameEn = ref('');
  const lastNameEn = ref('');
  const gender: Ref<Gender> = ref(undefined);
  const linkedinUsername = ref('');
  const githubUsername = ref('');

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

  const saveProfile = async () => {
    await user.setData({
      linkedinUsername: linkedinUsername.value,
      githubUsername: githubUsername.value,
    });
    await update();
  };

  const update = async () => {
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    firstNameEn.value = user.firstNameEn;
    lastNameEn.value = user.lastNameEn;
    gender.value = user.gender;
    linkedinUsername.value = user.linkedinUsername;
    githubUsername.value = user.githubUsername;
  };

  onMounted(async () => {
    await update();
  });
</script>

<template>
  <div class="flex flex-col gap-32">
    <VHeading tag="h1">Настройки</VHeading>
    <VCard>
      <ul>
        <li>
          <RouterLink class="link" :to="{ name: 'settings', hash: '#links' }"
            >Ссылки</RouterLink
          >
        </li>
        <li>
          <RouterLink class="link" :to="{ name: 'settings', hash: '#password' }"
            >Пароль</RouterLink
          >
        </li>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#certificate' }"
            >Данные для диплома</RouterLink
          >
        </li>
      </ul>
    </VCard>
    <VCard id="links">
      <VHeading class="mb-24" tag="h2">Ссылки</VHeading>
      <div class="flex flex-col items-start gap-16 tablet:gap-24">
        <VTextInput label="Ссылка на GitHub" v-model="githubUsername" />
        <VTextInput label="Ссылка на LinkedIn" v-model="linkedinUsername" />
      </div>
      <template #footer>
        <VButton @click="saveProfile">Сохранить</VButton>
      </template>
    </VCard>
    <VLoginChange id="password" />
    <VCard id="certificate">
      <VHeading class="mb-24" tag="h2">Данные для диплома</VHeading>
      <div class="mb-16 rounded bg-yellow bg-opacity-30 p-16">
        Будьте внимательнее, когда заполняете поля имени и фамилии на двух
        языках. Именно в таком виде они отобразятся в сертификате. И если вы
        ошибитесь — придется заново запускать генерацию сертификата. Хотелось бы
        этого избежать.
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
  </div>
</template>
