<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import VTextInput from '@/components/VTextInput';
  import VButton from '@/components/VButton';
  import VHeading from '@/components/VHeading';
  import VCard from '@/components/VCard';
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
  <VCard>
    <VHeading class="mb-24" tag="h2">Ссылки</VHeading>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        label="Ссылка на GitHub"
        v-model="githubUsername"
        data-testid="github" />
      <VTextInput
        label="Ссылка на LinkedIn"
        v-model="linkedinUsername"
        data-testid="linkedin" />
      <VTextInput
        label="Ссылка на Telegram"
        v-model="telegramUsername"
        data-testid="telegram" />
    </div>
    <template #footer>
      <VButton @click="saveProfile" data-testid="save">Сохранить</VButton>
    </template>
  </VCard>
</template>
