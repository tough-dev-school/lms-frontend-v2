<script lang="ts" setup>
  import { computed, defineAsyncComponent, ref } from 'vue';
  import { useForm, usePage } from '@inertiajs/vue3';
  import VCard from '@/components/VCard/VCard.vue';
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VError from '@/components/VError/VError.vue';
  import ClientOnly from '@/components/ClientOnly/ClientOnly.vue';
  import { useI18n } from 'vue-i18n';

  // cropperjs needs a real DOM, so the cropper loads in the browser only
  const AvatarCropper = defineAsyncComponent(
    () => import('vue-avatar-cropper'),
  );

  interface Cropper {
    getCroppedCanvas: () => HTMLCanvasElement;
  }

  const { t } = useI18n();
  const page = usePage();
  const user = computed(() => page.props.user);

  const avatar = ref(user.value?.avatar ?? undefined);
  const showCropper = ref(false);

  // An empty string asks the backend to remove the avatar
  const form = useForm<{ avatar: File | '' }>({ avatar: '' });

  const deleteAvatar = () => {
    avatar.value = undefined;
    form.avatar = '';
  };

  const saveProfile = () => {
    form.post('/settings/avatar', {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  const showPreview = async (cropper: Cropper) => {
    avatar.value = cropper.getCroppedCanvas().toDataURL();

    const response = await fetch(avatar.value);
    form.avatar = new File([await response.blob()], 'avatar.png');
  };

  const isSaveButtonDisabled = computed(
    () => avatar.value === (user.value?.avatar ?? undefined),
  );
</script>

<template>
  <VCard :title="t('settings.avatar')">
    <template v-if="user">
      <ClientOnly>
        <AvatarCropper
          v-model="showCropper"
          :labels="{ cancel: t('common.cancel'), submit: t('common.save') }"
          :upload-handler="showPreview"
        />
      </ClientOnly>
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
      <VError :error="form.errors" />
    </template>
    <template #footer>
      <VButton
        data-testid="save"
        :disabled="isSaveButtonDisabled"
        :loading="form.processing"
        @click="saveProfile"
      >
        {{ form.processing ? t('common.saving') : t('common.save') }}
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
