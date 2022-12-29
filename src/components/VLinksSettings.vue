<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import VTextInput from '@/components/VTextInput.vue';
  import VButton from '@/components/VButton.vue';
  import VHeading from '@/components/VHeading.vue';
  import VCard from '@/components/VCard.vue';
  import useUser from '@/stores/user';

  const linkedinUsername = ref('');
  const githubUsername = ref('');
  const telegramUsername = ref('');
  const user = useUser();

  const update = async () => {
    linkedinUsername.value = user.linkedinUsername;
    githubUsername.value = user.githubUsername;
    telegramUsername.value = user.telegramUsername;
  };

  const saveProfile = async () => {
    await user.setData({
      linkedinUsername: linkedinUsername.value,
      githubUsername: githubUsername.value,
      telegramUsername: telegramUsername.value,
    });
    await update();
  };

  onMounted(async () => {
    await update();
  });
</script>

<template>
  <VCard>
    <VHeading class="mb-24" tag="h2">Ссылки</VHeading>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput label="Ссылка на GitHub" v-model="githubUsername" />
      <VTextInput label="Ссылка на LinkedIn" v-model="linkedinUsername" />
      <VTextInput label="Ссылка на Telegram" v-model="telegramUsername" />
    </div>
    <template #footer>
      <VButton @click="saveProfile">Сохранить</VButton>
    </template>
  </VCard>
</template>
