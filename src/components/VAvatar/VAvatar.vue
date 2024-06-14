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

  const classes = computed(() => ({
    flex: true,
    'items-center': true,
    'justify-center': true,
    'rounded-full': true,
    'bg-back': !props.image,
    'object-cover': true,
    'p-4': !props.image,
    'h-32': props.size == 'sm',
    'w-32': props.size == 'sm',
    'h-72': props.size == 'md',
    'w-72': props.size == 'md',
  }));
</script>

<template>
  <img :class="classes" :src="image || defaultAvatar" />
</template>

<style scoped>
  img {
    background-image: radial-gradient(black 60%, lightgray 75%);
  }
</style>
