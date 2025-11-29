<script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import { useUpdateUserMutation, fetchUser } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import VError from '@/components/VError/VError.vue';

  const queryClient = useQueryClient();
  const {
    mutateAsync: updateUser,
    error,
    isPending,
  } = useUpdateUserMutation(queryClient);

  const data = ref({
    linkedinUsername: '',
    githubUsername: '',
    telegramUsername: '',
  });

  const saveProfile = async () => {
    await updateUser({
      linkedin_username: data.value.linkedinUsername,
      github_username: data.value.githubUsername,
      telegram_username: data.value.telegramUsername,
    });
  };

  onBeforeMount(async () => {
    const user = await fetchUser(queryClient);

    data.value = {
      linkedinUsername: user.linkedin_username ?? '',
      githubUsername: user.github_username ?? '',
      telegramUsername: user.telegram_username ?? '',
    };
  });
</script>

<template>
  <VCard title="Ссылки">
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        v-model="data.githubUsername"
        label="Ссылка на GitHub"
        data-testid="github"
      />
      <VTextInput
        v-model="data.linkedinUsername"
        label="Ссылка на LinkedIn"
        data-testid="linkedin"
      />
      <VTextInput
        v-model="data.telegramUsername"
        label="Ссылка на Telegram"
        data-testid="telegram"
      />
    </div>
    <VError :error="error" />
    <template #footer>
      <VButton
        data-testid="save"
        :loading="isPending"
        @click="saveProfile"
      >
        {{ isPending ? 'Сохраняется...' : 'Сохранить' }}
      </VButton>
    </template>
  </VCard>
</template>
