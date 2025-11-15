<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import {
    useUsersMeRetrieve,
    useUsersMePartialUpdate,
    usersMeRetrieveQueryKey,
  } from '@/api/generated/hooks';
  import { useQueryClient } from '@tanstack/vue-query';
  import { ContentType } from '@/api/generated-api';

  const queryClient = useQueryClient();
  const { data: user } = useUsersMeRetrieve();
  const { mutateAsync: updateUser, isPending: isUpdatePending } =
    useUsersMePartialUpdate({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: usersMeRetrieveQueryKey(),
          });
        },
      },
    });

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
    const avatarFile = file.value || null;
    const formData = new FormData();
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    } else {
      formData.append('avatar', '');
    }

    // @ts-expect-error formData type issue
    await updateUser(
      { data: formData },
      {
        client: {
          type: ContentType.FormData,
        },
      },
    );
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
    </template>
    <template #footer>
      <VButton
        data-testid="save"
        :disabled="isSaveButtonDisabled"
        :loading="isUpdatePending"
        @click="saveProfile"
      >
        {{ isUpdatePending ? 'Сохраняется...' : 'Сохранить' }}
      </VButton>
    </template>
  </VCard>
</template>
