<script lang="ts" setup>
  import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue';
  import GLightbox from 'glightbox';
  import 'glightbox/dist/css/glightbox.css';

  const props = withDefaults(
    defineProps<{
      html: string;
      enableLightbox?: boolean;
      group?: string;
    }>(),
    {
      group: 'lightbox',
      enableLightbox: true,
    },
  );

  const articleRef = useTemplateRef<HTMLElement>('articleRef');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lightbox: any = null;

  const initLightbox = () => {
    if (!props.enableLightbox) return;

    if (lightbox) {
      lightbox.destroy();
    }

    if (!articleRef.value) return;

    const images = articleRef.value.querySelectorAll('img');
    images.forEach((img) => {
      const parent = img.parentElement;
      if (parent && parent.tagName !== 'A') {
        const link = document.createElement('a');
        link.href = img.src;
        link.dataset.lightbox = props.group;

        img.before(link);
        link.append(img);
      }
    });

    // eslint-disable-next-line new-cap
    lightbox = GLightbox({
      selector: `[data-lightbox="${props.group}"]`,
      openEffect: 'zoom',
      closeEffect: 'none',
    });
  };

  onMounted(() => {
    initLightbox();
  });

  onUnmounted(() => {
    if (lightbox) {
      lightbox.destroy();
    }
  });

  watch(
    () => props.html,
    () => {
      setTimeout(() => {
        initLightbox();
      }, 0);
    },
  );
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <!-- #TODO Check for XSS-->
  <article
    ref="articleRef"
    class="prose-custom prose prose-a:break-words prose-pre:bg-transparent"
    v-html="html"
  />
</template>

<style></style>
