<script lang="ts" setup>
  import VCard from '@/components/VCard/VCard.vue';
  import { computed } from 'vue';
  import { getProviderByEmail } from '@brachkow/email-providers';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { SUPPORT_CHAT_URL } from '@/constants';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    email?: string;
  }>();

  const { t } = useI18n();

  const emailProvider = computed(() => getProviderByEmail(props.email ?? ''));
</script>

<template>
  <VPublicLayout>
    <VCard
      class="flex flex-col gap-16"
      :title="t('mailSent.title')"
    >
      <i18n-t
        keypath="mailSent.message"
        tag="div"
        data-testid="message"
        scope="global"
      >
        <template #email>{{ email }}</template>
        <template #contactUs>
          <a
            class="link"
            :href="SUPPORT_CHAT_URL"
            >{{ t('mailSent.contactUs') }}</a
          >
        </template>
      </i18n-t>
      <template #footer>
        <VButton
          v-if="emailProvider"
          class="flex-grow"
          data-testid="open"
          tag="a"
          :href="emailProvider.url"
        >
          {{ t('mailSent.openProvider', { provider: emailProvider.label }) }}
        </VButton>
      </template>
    </VCard>
  </VPublicLayout>
</template>
