<script lang="ts" setup>
  import { minidenticon } from 'minidenticons';
  import { computed } from 'vue';

  export interface Props {
    userId: string;
    image?: string;
    size?: 'sm' | 'md';
  }

  const props = withDefaults(defineProps<Props>(), {
    userId: '',
    image: '',
    size: 'sm',
  });

  const defaultAvatar = computed(
    () =>
      `data:image/svg+xml;utf8,${encodeURIComponent(
        minidenticon(props.userId, 100, 50),
      )}`,
  );
</script>

<template>
  <img
    :class="{
      'bg-back': !image,
      'p-4': !image,
      'h-32': size === 'sm',
      'w-32': size === 'sm',
      'h-72': size === 'md',
      'w-72': size === 'md',
    }"
    class="flex items-center justify-center rounded-full object-cover"
    :src="image || defaultAvatar" />
</template>

<style scoped>
  img {
    background-image: radial-gradient(black 60%, lightgray 75%);
  }
</style>
