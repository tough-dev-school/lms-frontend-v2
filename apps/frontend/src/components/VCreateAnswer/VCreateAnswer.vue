<script lang="ts" setup>
  import VTextEditor from '@/components/VTextEditor/VTextEditor.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { computed } from 'vue';

  const props = defineProps<{
    isPending: boolean;
  }>();

  const emit = defineEmits<{
    send: [];
  }>();

  const content = defineModel<string | object>({ required: true });

  const isDisabled = computed(
    () => !content.value.content.content || props.isPending,
  );
</script>

<template>
  <div class="SendOwnAnswer__Container">
    <VTextEditor
      v-model="content"
      class="SendOwnAnswer__Editor"
      @send="emit('send')" />
    <div class="SendOwnAnswer__Footer">
      <VButton
        :disabled="isDisabled"
        :loading="isPending"
        class="h-32"
        @click="emit('send')">
        {{ isPending ? 'Отправляется...' : 'Отправить' }}
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
