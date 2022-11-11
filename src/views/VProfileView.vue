<script lang="ts" setup>
  import VTextInput from '@/components/VTextInput.vue';
  import VButton from '@/components/VButton.vue';
  import VHeading from '@/components/VHeading.vue';
  import { onMounted, ref } from 'vue';
  import type { Ref } from 'vue';
  import useUser from '@/stores/user';
  import type { Gender } from '@/types/users';

  const user = useUser();

  const firstName = ref('');
  const lastName = ref('');
  const firstNameEn = ref('');
  const lastNameEn = ref('');
  const gender: Ref<Gender> = ref(undefined);
  const linkedinUsername = ref('');
  const githubUsername = ref('');

  const save = async () => {
    await user.setData({
      firstName: firstName.value,
      lastName: lastName.value,
      firstNameEn: firstNameEn.value,
      lastNameEn: lastNameEn.value,
      gender: gender.value,
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
  <div class="px-16 tablet:px-32">
    <VHeading class="mb-24" level="1">Данные для диплома</VHeading>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput label="Имя" v-model="firstName" />
      <VTextInput label="Фамилия" v-model="lastName" />
      <VTextInput label="Имя (на английском)" v-model="firstNameEn" />
      <VTextInput label="Фамилия (на английском)" v-model="lastNameEn" />
      <VTextInput label="Ник на GitHub" v-model="githubUsername" />
      <VTextInput label="Ник на LinkedIn" v-model="linkedinUsername" />
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
    <div class="mt-64">
      <VButton @click="save">Обновить</VButton>
    </div>
  </div>
</template>
