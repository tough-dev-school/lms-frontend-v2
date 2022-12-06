<script lang="ts" setup>
  import { ref } from 'vue';
  import VHeading from '@/components/VHeading.vue';
  import VButton from '@/components/VButton.vue';
  import VCard from '@/components/VCard.vue';
  import VTextInput from '@/components/VTextInput.vue';
  import useAuth from '@/stores/auth';

  export interface Props {
    uid: string;
    token: string;
  }

  const auth = useAuth();

  const newPassword1 = ref('');
  const newPassword2 = ref('');

  const props = defineProps<Props>();
  const emit = defineEmits<{ (e: 'save'): void }>();

  const savePassword = async () => {
    auth
      .changePassword(
        newPassword1.value,
        newPassword2.value,
        props.uid,
        props.token,
      )
      .then(() => {
        emit('save');
      })
      .catch(() => {});
  };
</script>

<template>
  <VCard>
    <VHeading class="mb-24" level="1" v-if="!auth.token">Сброс пароля</VHeading>
    <VHeading class="mb-24" level="2" v-else>Пароль</VHeading>
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput type="password" label="Новый пароль" v-model="newPassword1" />
      <VTextInput
        type="password"
        label="Повторите пароль"
        v-model="newPassword2" />
      <VButton @click="savePassword">Сохранить</VButton>
    </div>
  </VCard>
</template>
