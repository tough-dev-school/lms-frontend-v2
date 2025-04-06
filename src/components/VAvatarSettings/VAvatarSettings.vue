<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { useUpdateUserMutation, useUserQuery } from '@/query';

  const { data: user } = useUserQuery();

  const avatar = ref();
  const file = ref();
  const showCropper = ref(false);

  const { mutateAsync: updateAvatar } = useUpdateUserMutation();

  const showPreview = async (cropperInstance: any) => {
    avatar.value = cropperInstance!.getCroppedCanvas()!.toDataURL();

    const response = await fetch(avatar.value);
    const blob: Blob = await response.blob();
    (file.value as File) = new File([blob], 'avatar.png');
  };

  const isSaveButtonDisabled = computed(
    () => avatar.value === user.value?.avatar,
  );
</script>

<template>
  <VCard>
    <VHeading class="mb-24" tag="h2">Аватар</VHeading>
    <avatar-cropper
      v-model="showCropper"
      :labels="{ cancel: 'Отменить', submit: 'Сохранить' }"
      :upload-handler="showPreview" />
    <div class="flex gap-16">
      <VAvatar :user-id="user?.uuid" :image="user?.avatar" size="md" />
      <button data-testid="upload" class="link p-6" @click="showCropper = true">
        Загрузить
      </button>
      <button
        v-if="avatar"
        data-testid="delete"
        class="p-6 hover:text-red"
        @click="updateAvatar(null)">
        Удалить
      </button>
    </div>
    <template #footer>
      <VButton
        data-testid="save"
        :disabled="isSaveButtonDisabled"
        @click="updateAvatar(file.value || null)">
        Сохранить
      </VButton>
    </template>
  </VCard>
</template>
