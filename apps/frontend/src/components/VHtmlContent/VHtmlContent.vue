<script lang="ts" setup>
  import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue';
  import type GLightbox from 'glightbox';

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
  let lightbox: ReturnType<typeof GLightbox> | null = null;

  const initLightbox = async () => {
    if (!props.enableLightbox) return;

    // glightbox touches document as soon as it loads, so it can't be imported on the server
    const [{ default: createLightbox }] = await Promise.all([
      import('glightbox'),
      import('glightbox/dist/css/glightbox.css'),
    ]);

    lightbox?.destroy();

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

    lightbox = createLightbox({
      selector: `[data-lightbox="${props.group}"]`,
      openEffect: 'none',
      closeEffect: 'none',
    });
  };

  onMounted(() => {
    void initLightbox();
  });

  onUnmounted(() => {
    lightbox?.destroy();
  });

  watch(
    () => props.html,
    () => {
      setTimeout(() => {
        void initLightbox();
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
