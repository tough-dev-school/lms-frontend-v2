<script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import { useUpdateUserMutation, fetchUserQuery } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';

  const data = ref({
    linkedinUsername: '',
    githubUsername: '',
    telegramUsername: '',
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const saveProfile = async () => {
    await updateUser({
      linkedinUsername: data.value.linkedinUsername,
      githubUsername: data.value.githubUsername,
      telegramUsername: data.value.telegramUsername,
    });
  };

  onBeforeMount(async () => {
    const currentUserData = await fetchUserQuery(queryClient);
    data.value = currentUserData;
  });
</script>

<template>
  <VCard>
    <VHeading class="mb-24" tag="h2">Ссылки</VHeading>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        v-model="data.githubUsername"
        label="Ссылка на GitHub"
        data-testid="github" />
      <VTextInput
        v-model="data.linkedinUsername"
        label="Ссылка на LinkedIn"
        data-testid="linkedin" />
      <VTextInput
        v-model="data.telegramUsername"
        label="Ссылка на Telegram"
        data-testid="telegram" />
    </div>
    <template #footer>
      <VButton data-testid="save" @click="saveProfile">Сохранить</VButton>
    </template>
  </VCard>
</template>
