<script lang="ts" setup>
  import { VAnswerActionsDesktop } from '@/components/VAnswerActionsDesktop';
  import { VAnswerActionsMobile } from '@/components/VAnswerActionsMobile';

  const emit = defineEmits<{
    delete: [];
    edit: [];
  }>();
</script>

<template>
  <div class="flex gap-8">
    <VAnswerActionsDesktop
      class="hidden tablet:flex"
      data-testid="desktop"
      @edit="emit('edit')"
      @delete="emit('delete')" />
    <VAnswerActionsMobile
      class="tablet:hidden"
      data-testid="mobile"
      @edit="emit('edit')"
      @delete="emit('delete')" />
  </div>
</template>
