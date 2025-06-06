<script lang="ts" setup>
  import VToast from '@/components/VToast/VToast.vue';
  import useToasts from '@/stores/toasts';
  import { storeToRefs } from 'pinia';

  const toasts = useToasts();
  const { messages } = storeToRefs(toasts);

  const handleDelete = (id: string) => {
    toasts.removeMessage(id);
  };
</script>

<template>
  <div
    class="container-fluid fixed right-0 top-16 left-0 flex flex-col items-center gap-8">
    <TransitionGroup name="toast">
      <VToast
        v-for="message in messages"
        v-bind="message"
        :key="message.id"
        data-testid="toast"
        @delete="handleDelete" />
    </TransitionGroup>
  </div>
</template>

<style>
  .toast-enter-active,
  .toast-leave-active {
    transition: all 300ms ease;
  }

  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
