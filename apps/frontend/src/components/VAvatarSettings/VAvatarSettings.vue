<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import {
    useUsersMeRetrieve,
    usersMeRetrieveQueryKey,
  } from '@/api/generated/hooks';
  import { useQueryClient } from '@tanstack/vue-query';
  import { createHttpClient } from '@/api/client';
  import VError from '@/components/VError/VError.vue';
  import type { FormError } from '@/types/error';

  const queryClient = useQueryClient();
  const { data: user } = useUsersMeRetrieve();

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

  const isPending = ref(false);

  const error = ref<FormError | null>(null);

  const saveProfile = async () => {
    const avatarFile = file.value || null;
    const formData = new FormData();
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    } else {
      formData.append('avatar', '');
    }

    isPending.value = true;

    const httpClient = createHttpClient();

    try {
      await httpClient.post('/api/v2/users/me/', {
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      queryClient.invalidateQueries({
        queryKey: usersMeRetrieveQueryKey(),
      });
    } catch (caughtError) {
      error.value = caughtError as unknown as FormError;
    } finally {
      isPending.value = false;
    }
  };

  // #FIXME
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <template v-if="user">
      <avatar-cropper
        v-model="showCropper"
        :labels="{ cancel: 'Отменить', submit: 'Сохранить' }"
        :upload-handler="showPreview"
      />
      <div class="flex gap-16">
        <VAvatar
          :user-id="user.uuid"
          :image="avatar"
          size="md"
        />
        <button
          data-testid="upload"
          class="link p-6"
          @click="showCropper = true"
        >
          Загрузить
        </button>
        <button
          v-if="avatar"
          data-testid="delete"
          class="p-6 hover:text-red"
          @click="deleteAvatar"
        >
          Удалить
        </button>
      </div>
      <VError :error="error" />
    </template>
    <template #footer>
      <VButton
        data-testid="save"
        :disabled="isSaveButtonDisabled"
        :loading="isPending"
        @click="saveProfile"
      >
        {{ isPending ? 'Сохраняется...' : 'Сохранить' }}
      </VButton>
    </template>
  </VCard>
</template>

<style>
  .avatar-cropper {
    color: black;
  }

  .avatar-cropper-btn:hover {
    @apply !bg-yellow !text-black;
  }
</style>
