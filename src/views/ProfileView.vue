<script lang="ts" setup>
  import TextInput from '@/components/TextInput.vue';
  import Button from '@/components/Button.vue';
  import { onMounted, ref } from 'vue';
  import useUser from '@/stores/user';

  const user = useUser();

  const first_name = ref('');
  const last_name = ref('');
  const first_name_en = ref('');
  const last_name_en = ref('');
  const gender = ref('');
  const linkedin_username = ref('');
  const github_username = ref('');

  const save = async () => {
    await user.setUserData({
      first_name: first_name.value,
      last_name: last_name.value,
      first_name_en: first_name_en.value,
      last_name_en: last_name_en.value,
      gender: gender.value,
      linkedin_username: linkedin_username.value,
      github_username: github_username.value,
    });
  };

  const update = async () => {
    await user.getUserData();

    first_name.value = user.first_name;
    last_name.value = user.last_name;
    first_name_en.value = user.first_name_en;
    last_name_en.value = user.last_name_en;
    gender.value = user.gender;
    linkedin_username.value = user.linkedin_username;
    github_username.value = user.github_username;
  };

  onMounted(async () => {
    await update();
  });
</script>

<template>
  <div class="flex max-w-prose flex-col items-start gap-24">
    <h1 class="Heading_H1">Данные для диплома</h1>
    <TextInput label="Имя" v-model="first_name" />
    <TextInput label="Фамилия" v-model="last_name" />
    <TextInput label="Имя (на английском)" v-model="first_name_en" />
    <TextInput label="Фамилия (на английском)" v-model="last_name_en" />
    <TextInput label="Ник на GitHub" v-model="github_username" />
    <TextInput label="Ник на LinkedIn" v-model="linkedin_username" />
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
    <div class="mt-64">
      <Button @click="save">Обновить</Button>
    </div>
  </div>
</template>
