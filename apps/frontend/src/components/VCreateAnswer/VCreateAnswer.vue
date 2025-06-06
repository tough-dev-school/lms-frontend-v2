<script lang="ts" setup>
  import VTextEditor from '@/components/VTextEditor/VTextEditor.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { computed } from 'vue';

  const emit = defineEmits<{
    send: [];
  }>();

  const text = defineModel<string>({ required: true });
  const isDisabled = computed(() => !(text.value.length > 0));
</script>

<template>
  <div class="SendOwnAnswer__Container">
    <VTextEditor
      v-model="text"
      class="SendOwnAnswer__Editor"
      @send="emit('send')" />
    <div class="SendOwnAnswer__Footer">
      <VButton :disabled="isDisabled" class="h-32" @click="emit('send')">
        Сохранить
      </VButton>
    </div>
  </div>
</template>

<style scoped>
  .SendOwnAnswer {
    &__Container {
      @apply px-0 pt-0 tablet:px-0;
    }
    &__Editor {
      @apply mb-16 rounded-t;
    }
    &__Footer {
    }
  }
</style>
