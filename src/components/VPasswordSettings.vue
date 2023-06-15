<script lang="ts" setup>
  import { ref } from 'vue';
  import VHeading from '@/components/VHeading.vue';
  import VButton from '@/components/VButton.vue';
  import VCard from '@/components/VCard.vue';
  import VTextInput from '@/components/VTextInput.vue';
  import useAuth from '@/stores/auth';

  export interface Props {
    uid?: string;
    token?: string;
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
      uid: props.uid,
      token: props.token,
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
