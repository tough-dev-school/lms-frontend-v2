<!-- import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'

const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  )
  return (<img src={svgURI} alt={username} {...props} />)
} -->

<script lang="ts" setup>
  import { minidenticon } from 'minidenticons';
  import { computed } from 'vue';

  export interface Props {
    userId: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    userId: '',
  });

  const image = computed(
    () =>
      `data:image/svg+xml;utf8,${encodeURIComponent(
        minidenticon(props.userId, 100, 50),
      )}`,
  );
</script>

<template>
  <img
    class="flex h-32 w-32 items-center justify-center rounded-full bg-black object-cover p-4"
    :src="image" />
</template>
