<script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import {
    useUsersMePartialUpdate,
    usersMeRetrieveQueryKey,
    usersMeRetrieveQueryOptions,
  } from '@/api';
  import { useQueryClient } from '@tanstack/vue-query';
  import VError from '@/components/VError/VError.vue';

  const queryClient = useQueryClient();
  const {
    mutateAsync: updateUser,
    isPending,
    error,
  } = useUsersMePartialUpdate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: usersMeRetrieveQueryKey(),
        });
      },
    },
  });

  const data = ref({
    linkedinUsername: '',
    githubUsername: '',
    telegramUsername: '',
  });

  const saveProfile = async () => {
    await updateUser({
      data: {
        linkedin_username: data.value.linkedinUsername,
        github_username: data.value.githubUsername,
        telegram_username: data.value.telegramUsername,
      },
    });
  };

  onBeforeMount(async () => {
    const user = await queryClient.fetchQuery(usersMeRetrieveQueryOptions());

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
        name="github_username"
        :error="error"
      />
      <VTextInput
        v-model="data.linkedinUsername"
        label="Ссылка на LinkedIn"
        data-testid="linkedin"
        name="linkedin_username"
        :error="error"
      />
      <VTextInput
        v-model="data.telegramUsername"
        label="Ссылка на Telegram"
        data-testid="telegram"
        name="telegram_username"
        :error="error"
      />
    </div>
    <VError
      :error="error"
      :whitelist="['non_field_errors']"
    />
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
