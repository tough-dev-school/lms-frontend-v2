<script lang="ts" setup>
  import { ref } from 'vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
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

  const isPending = ref(false);

  const savePassword = async () => {
    isPending.value = true;
    try {
      await auth.changePassword({
        newPassword1: newPassword1.value,
        newPassword2: newPassword2.value,
        uid: props.uid,
        token: props.token,
      });

      emit('save');
    } catch {}
    isPending.value = false;
  };
</script>

<template>
  <VCard :title="!auth.token ? 'Сброс пароля' : 'Пароль'">
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        v-model="newPassword1"
        type="password"
        label="Новый пароль"
        data-testid="password1" />
      <VTextInput
        v-model="newPassword2"
        type="password"
        label="Повторите пароль"
        data-testid="password2" />
    </div>
    <template #footer>
      <VButton :loading="isPending" data-testid="save" @click="savePassword">
        Сохранить
      </VButton>
    </template>
  </VCard>
</template>
