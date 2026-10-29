<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { useUsersMeRetrieve, usersMeRetrieveQueryKey } from '@/api/generated';
  import { useQueryClient } from '@tanstack/vue-query';
  import { createHttpClient } from '@/api/client';
  import VError from '@/components/VError/VError.vue';
  import type { FormError } from '@/types/error';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const queryClient = useQueryClient();
  const { data: user } = useUsersMeRetrieve();

  const avatar = ref<string | null>();
  const file = ref<File>();
  const showCropper = ref(false);

  const update = () => {
    avatar.value = user.value?.avatar;
  };

  const deleteAvatar = () => {
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

    // #FIXME this should be done with kubb when avatar will be marked as multipart/form-data
    const httpClient = createHttpClient();

    try {
      await httpClient.patch('/api/v2/users/me/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      void queryClient.invalidateQueries({
        queryKey: usersMeRetrieveQueryKey(),
      });
    } catch (caughtError) {
      error.value = caughtError as FormError;
    } finally {
      isPending.value = false;
    }
  };

  // #FIXME
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPreview = async (cropperInstance: any) => {
    const dataUrl: string = cropperInstance!.getCroppedCanvas()!.toDataURL();
    avatar.value = dataUrl;

    const response = await fetch(dataUrl);
    const blob = await response.blob();
    file.value = new File([blob], 'avatar.png');
  };

  const isSaveButtonDisabled = computed(
    () => avatar.value === user.value?.avatar,
  );

  update();
</script>

<template>
  <VCard :title="t('settings.avatar')">
    <template v-if="user">
      <avatar-cropper
        v-model="showCropper"
        :labels="{ cancel: t('common.cancel'), submit: t('common.save') }"
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
          {{ t('avatarSettings.upload') }}
        </button>
        <button
          v-if="avatar"
          data-testid="delete"
          class="p-6 hover:text-red"
          @click="deleteAvatar"
        >
          {{ t('avatarSettings.delete') }}
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
        {{ isPending ? t('common.saving') : t('common.save') }}
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
