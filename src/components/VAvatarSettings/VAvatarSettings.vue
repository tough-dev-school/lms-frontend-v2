<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { useUserQuery, useUpdateUserAvatarMutation } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import useToasts from '@/stores/toasts';

  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();
  const { mutateAsync: updateAvatar } =
    useUpdateUserAvatarMutation(queryClient);
  const toasts = useToasts();

  const avatar = ref();
  const file = ref();
  const showCropper = ref(false);

  const update = () => {
    avatar.value = user.value?.avatar;
  };

  const deleteAvatar = async () => {
    avatar.value = undefined;
    file.value = undefined;
  };

  const saveProfile = async () => {
    await updateAvatar(file.value || null);
    toasts.addMessage('Данные сохранены!', 'success');
    update();
  };

  const showPreview = async (cropperInstance: any) => {
    avatar.value = cropperInstance!.getCroppedCanvas()!.toDataURL();

    const response = await fetch(avatar.value);
    const blob: Blob = await response.blob();
    (file.value as File) = new File([blob], 'avatar.png');
  };

  const isSaveButtonDisabled = computed(
    () => avatar.value === user.value?.avatar,
  );

  update();
</script>

<template>
  <VCard title="Аватар">
    <avatar-cropper
      v-model="showCropper"
      :labels="{ cancel: 'Отменить', submit: 'Сохранить' }"
      :upload-handler="showPreview" />
    <div class="flex gap-16">
      <VAvatar :user-id="user?.uuid" :image="avatar" size="md" />
      <button data-testid="upload" class="link p-6" @click="showCropper = true">
        Загрузить
      </button>
      <button
        v-if="avatar"
        data-testid="delete"
        class="p-6 hover:text-red"
        @click="deleteAvatar">
        Удалить
      </button>
    </div>
    <template #footer>
      <VButton
        data-testid="save"
        :disabled="isSaveButtonDisabled"
        @click="saveProfile"
        >Сохранить</VButton
      >
    </template>
  </VCard>
</template>
