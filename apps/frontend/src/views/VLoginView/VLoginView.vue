<script lang="ts" setup>
  import { router, usePage } from '@inertiajs/vue3';
  import VLoginLink from '@/components/VLoginLink/VLoginLink.vue';
  import VLoginPassword from '@/components/VLoginPassword/VLoginPassword.vue';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import { onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  export type Mode = 'link' | 'password';

  const props = defineProps<{
    redirectTo: string | null;
  }>();

  // An expired magic link sends students here with the reason
  const page = usePage();
  const { t } = useI18n();

  const mode = ref<Mode>('link');

  // TODO: remove after 2027-04-26. The previous version of the app kept the token in localStorage
  // as {"token": "..."}. The key goes first, so a dead token can't loop back here.
  const LEGACY_AUTH_KEY = 'auth';

  const readLegacyToken = () => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(LEGACY_AUTH_KEY) ?? 'null',
      ) as {
        token?: unknown;
      } | null;
      return typeof stored?.token === 'string' ? stored.token : undefined;
    } catch {
      return undefined;
    }
  };

  onMounted(() => {
    const token = readLegacyToken();
    localStorage.removeItem(LEGACY_AUTH_KEY);
    if (!token) return;

    router.post(
      '/login/token',
      { token, redirectTo: props.redirectTo },
      { replace: true },
    );
  });
</script>

<template>
  <VPublicLayout>
    <p
      v-if="page.props.errors.link"
      class="text-red"
      data-testid="login-error"
    >
      {{ t('login.linkExpired') }}
    </p>
    <VLoginLink
      v-if="mode === 'link'"
      data-testid="login-link"
      @change="mode = 'password'"
    />
    <VLoginPassword
      v-else-if="mode === 'password'"
      data-testid="login-password"
      :redirect-to="redirectTo"
      @change="mode = 'link'"
    />
  </VPublicLayout>
</template>
