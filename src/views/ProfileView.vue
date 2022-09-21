<script lang="ts" setup>
  import TextInput from '@/components/TextInput.vue';
  import Button from '@/components/Button.vue';
  import { ref } from 'vue';

  const nameRu = ref('');
  const surnameRu = ref('');
  const nameEn = ref('');
  const surnameEn = ref('');
  const github = ref('');
  const linkedin = ref('');

  const save = () => {};
</script>

<template>
  <div class="flex max-w-prose flex-col items-start gap-24">
    <h1 class="Heading_H1">Данные для диплома</h1>
    <TextInput label="Имя" v-model="nameRu" />
    <TextInput label="Фамилия" v-model="surnameRu" />
    <TextInput label="Имя (на английском)" v-model="nameEn" />
    <TextInput label="Фамилия (на английском)" v-model="surnameEn" />
    <TextInput label="Ник на GitHub" v-model="github" />
    <TextInput label="Ник на LinkedIn" v-model="linkedin" />
    <fieldset class="flex flex-wrap gap-16">
      <legend class="Label">Пол</legend>
      <label class="cursor-pointer"
        ><input type="radio" name="gender" /> Мужской</label
      >
      <label class="cursor-pointer"
        ><input type="radio" name="gender" /> Женский</label
      >
    </fieldset>
    <div class="mt-64">
      <Button @click="save">Обновить</Button>
    </div>
  </div>
</template>
