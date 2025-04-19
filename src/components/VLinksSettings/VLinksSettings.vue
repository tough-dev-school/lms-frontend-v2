<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import useUser from '@/stores/user';

  const linkedinUsername = ref('');
  const githubUsername = ref('');
  const telegramUsername = ref('');
  const user = useUser();

  const update = () => {
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
    update();
  };

  onMounted(() => {
    update();
  });
</script>

<template>
  <VCard title="Ссылки">
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        v-model="githubUsername"
        label="Ссылка на GitHub"
        data-testid="github" />
      <VTextInput
        v-model="linkedinUsername"
        label="Ссылка на LinkedIn"
        data-testid="linkedin" />
      <VTextInput
        v-model="telegramUsername"
        label="Ссылка на Telegram"
        data-testid="telegram" />
    </div>
    <template #footer>
      <VButton data-testid="save" @click="saveProfile">Сохранить</VButton>
    </template>
  </VCard>
</template>
