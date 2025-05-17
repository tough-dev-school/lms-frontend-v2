<script lang="ts" setup>
  import VTextEditor from '@/components/VTextEditor/VTextEditor.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { ref, computed, watch } from 'vue';
  import { useStorage } from '@vueuse/core';

  const props = defineProps<{
    initialText?: string;
    draftKey: (string | undefined)[];
  }>();

  const emit = defineEmits<{
    send: [string];
  }>();

  const text = ref(props.initialText ?? '');

  const draft = useStorage(
    ['draft', ...props.draftKey].filter(Boolean).join('-'),
    '',
    localStorage,
  );

  watch(
    () => text.value,
    (value) => {
      draft.value = value;
    },
  );

  const handleSave = () => {
    draft.value = '';
    emit('send', text.value);
    text.value = '';
  };

  const isDisabled = computed(() => !(text.value.length > 0));
</script>

<template>
  <div class="SendOwnAnswer__Container">
    <VTextEditor
      v-model="text"
      class="SendOwnAnswer__Editor"
      @send="handleSave" />
    <div class="SendOwnAnswer__Footer">
      <VButton :disabled="isDisabled" class="h-32" @click="handleSave">
        Сохранить
      </VButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .SendOwnAnswer {
    &__Container {
      @apply px-0 pt-0 tablet:px-0;
    }
    &__Editor {
      @apply mb-16 rounded-t border-b border-offwhite;
    }
    &__Footer {
    }
  }
</style>
