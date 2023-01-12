<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VCard from '@/components/VCard.vue';
  import VButton from '@/components/VButton.vue';
  import useAuth from '@/stores/auth';
  import { useRouter, useRoute } from 'vue-router';
  import { computed } from 'vue';

  const auth = useAuth();
  const router = useRouter();

  const route = useRoute();

  const email = computed(() => String(route.query.email));

  const resendEmail = async () => {
    await auth.loginWithEmail(email.value);
  };

  const back = () => {
    router.push({ name: 'login' });
  };
</script>

<template>
  <VCard class="mt-[25vh] flex flex-col gap-16">
    <VHeading tag="h1">Ссылка отправлена</VHeading>
    <p class="pb-32" data-testid="message">
      Мы отправили ссылку по адресу {{ email }}
    </p>
    <template #footer>
      <VButton class="flex-grow" @click="resendEmail" data-testid="resend"
        >Отправить ещё раз</VButton
      >
      <VButton
        class="flex-grow"
        appearance="link"
        @click="back"
        data-testid="restart"
        >На другую почту</VButton
      >
    </template>
  </VCard>
</template>
