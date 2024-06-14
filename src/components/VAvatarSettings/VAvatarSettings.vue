<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import useUser from '@/stores/user';

  const user = useUser();
  const avatar = ref();
  const file = ref();
  const showCropper = ref(false);

  const update = () => {
    avatar.value = user.avatar!;
  };

  const deleteAvatar = async () => {
    avatar.value = undefined;
    file.value = undefined;
  };

  const saveProfile = async () => {
    await user.setAvatar(file.value || null);
    update();
  };

  const showPreview = async (cropperInstance: any) => {
    avatar.value = cropperInstance!.getCroppedCanvas()!.toDataURL();

    const response = await fetch(avatar.value);
    const blob: Blob = await response.blob();
    (file.value as File) = new File([blob], 'avatar.png');
  };

  const isSaveButtonDisabled = computed(() => avatar.value == user.avatar);

  onMounted(() => {
    update();
  });
</script>

<template>
  <VCard>
    <VHeading class="mb-24" tag="h2">Аватар</VHeading>
    <avatar-cropper
      v-model="showCropper"
      :labels="{ cancel: 'Отменить', submit: 'Сохранить' }"
      :upload-handler="showPreview" />
    <div class="flex gap-16">
      <VAvatar :user-id="user.uuid" :image="avatar" size="md" />
      <button class="link p-6" @click="showCropper = true">Загрузить</button>
      <button v-if="avatar" class="p-6 hover:text-red" @click="deleteAvatar">
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
