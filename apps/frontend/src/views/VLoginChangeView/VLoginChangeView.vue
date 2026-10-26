<script lang="ts" setup>
  import { useForm } from '@inertiajs/vue3';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VPasswordResetForm from '@/components/VPasswordResetForm/VPasswordResetForm.vue';

  const props = defineProps<{
    uid: string;
    token: string;
  }>();

  const form = useForm({ new_password1: '', new_password2: '' });

  const handleSave = (password: string) => {
    form.new_password1 = password;
    form.new_password2 = password;
    form.post(`/auth/password/reset/${props.uid}/${props.token}/`);
  };
</script>

<template>
  <VPublicLayout>
    <VPasswordResetForm
      :title="$t('loginReset.title')"
      :is-pending="form.processing"
      :error="form.errors"
      @save="handleSave"
    />
  </VPublicLayout>
</template>
