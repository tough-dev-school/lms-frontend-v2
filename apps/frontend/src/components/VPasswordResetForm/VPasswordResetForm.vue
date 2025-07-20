<script lang="ts" setup>
  import { ref } from 'vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';

  export interface Props {
    title: string;
    isPending: boolean;
  }

  defineProps<Props>();

  const emit = defineEmits<{ save: [password: string] }>();

  const newPassword1 = ref('');
  const newPassword2 = ref('');

  const handleSubmit = async () => {
    emit('save', newPassword1.value);
  };
</script>

<template>
  <VCard tag="form" :title="title" @submit.prevent="handleSubmit">
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
      <VButton :loading="isPending" data-testid="save" type="submit">
        {{ isPending ? 'Сохраняется...' : 'Сохранить' }}
      </VButton>
    </template>
  </VCard>
</template>
