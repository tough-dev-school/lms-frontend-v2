<script lang="ts" setup>
  import { VButton } from '@/components/VButton';
  import { VCard } from '@/components/VCard';
  import { VHeading } from '@/components/VHeading';
  import { VTextInput } from '@/components/VTextInput';
  import useAuth from '@/stores/auth';
  import { ref } from 'vue';

  export interface Props {
    token?: string;
    uid?: string;
  }

  const auth = useAuth();

  const newPassword1 = ref('');
  const newPassword2 = ref('');

  const props = defineProps<Props>();
  const emit = defineEmits<{ save: [] }>();

  const savePassword = async () => {
    await auth.changePassword({
      newPassword1: newPassword1.value,
      newPassword2: newPassword2.value,
      token: props.token,
      uid: props.uid,
    });

    emit('save');
  };
</script>

<template>
  <VCard>
    <VHeading
      class="mb-24"
      level="1"
      v-if="!auth.token"
      data-testid="reset-heading"
      >Сброс пароля</VHeading
    >
    <VHeading class="mb-24" level="2" v-else data-testid="change-heading"
      >Пароль</VHeading
    >
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        type="password"
        label="Новый пароль"
        data-testid="password1"
        v-model="newPassword1" />
      <VTextInput
        type="password"
        label="Повторите пароль"
        data-testid="password2"
        v-model="newPassword2" />
    </div>
    <template #footer>
      <VButton data-testid="save" @click="savePassword">Сохранить</VButton>
    </template>
  </VCard>
</template>
