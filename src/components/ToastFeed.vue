<script lang="ts" setup>
  import Toast from '@/components/Toast.vue';
  import useToasts from '@/stores/toasts';
  import { storeToRefs } from 'pinia';

  const toasts = useToasts();
  const { messages } = storeToRefs(toasts);

  const handleDelete = (id: string) => {
    toasts.removeMessage(id);
  };
</script>

<template>
  <div class="fixed right-16 bottom-16 flex flex-col gap-8">
    <TransitionGroup name="toast">
      <Toast
        v-for="message in messages"
        :key="message.id"
        :text="message.text"
        :lifetime="message.lifetime"
        :id="message.id"
        @delete="handleDelete"
        data-testid="toast" />
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
  .toast {
    &-enter-active,
    &-leave-active {
      transition: all 300ms ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
</style>
