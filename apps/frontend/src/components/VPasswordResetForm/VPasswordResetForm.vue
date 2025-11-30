<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VError from '@/components/VError/VError.vue';
  import type { FormError } from '@/types/error';
  import { createValidationError, mergeErrors } from '@/types/error';

  export interface Props {
    title: string;
    isPending: boolean;
    error?: FormError;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{ save: [password: string] }>();

  const newPassword1 = ref('');
  const newPassword2 = ref('');
  const validationError = ref<FormError>(null);

  const displayError = computed(() => {
    return mergeErrors(props.error ?? null, validationError.value);
  });

  const isValid = computed(() => {
    if (!newPassword1.value || !newPassword2.value) {
      return false;
    }
    return newPassword1.value === newPassword2.value;
  });

  const handleSubmit = async () => {
    validationError.value = null;

    if (!newPassword1.value) {
      validationError.value = createValidationError({
        new_password1: 'Введите новый пароль',
      });
      return;
    }

    if (!newPassword2.value) {
      validationError.value = createValidationError({
        new_password2: 'Повторите пароль',
      });
      return;
    }

    if (newPassword1.value !== newPassword2.value) {
      validationError.value = createValidationError({
        non_field_errors: 'Пароли не совпадают',
      });
      return;
    }

    emit('save', newPassword1.value);
  };
</script>

<template>
  <VCard
    tag="form"
    :title="title"
    @submit.prevent="handleSubmit"
  >
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        v-model="newPassword1"
        type="password"
        label="Новый пароль"
        data-testid="password1"
        name="new_password1"
        :error="displayError"
      />
      <VTextInput
        v-model="newPassword2"
        type="password"
        label="Повторите пароль"
        data-testid="password2"
        name="new_password2"
        :error="displayError"
      />
      <VError
        :error="displayError"
        :whitelist="['new_password1', 'new_password2', 'non_field_errors']"
      />
    </div>
    <template #footer>
      <VButton
        :loading="isPending"
        :disabled="!isValid"
        data-testid="save"
        type="submit"
      >
        {{ isPending ? 'Сохраняется...' : 'Сохранить' }}
      </VButton>
    </template>
  </VCard>
</template>
