<script lang="ts" setup>
  import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue';
  import GLightbox from 'glightbox';
  import 'glightbox/dist/css/glightbox.css';

  const props = withDefaults(
    defineProps<{
      html: string;
      enableLightbox?: boolean;
    }>(),
    {
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
    images.forEach((img, index) => {
      const parent = img.parentElement;
      if (parent && parent.tagName !== 'A') {
        const link = document.createElement('a');
        link.href = img.src;
        link.dataset.lightbox = 'answer-images';
        link.dataset.glightbox = `title:Image ${index + 1}`;

        img.before(link);
        link.append(img);
      }
    });

    // eslint-disable-next-line new-cap
    lightbox = GLightbox({
      selector: '[data-lightbox="answer-images"]',
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

<style>
  .prose {
    @apply flex flex-col;
  }

  .prose > *:first-child {
    margin-top: 0;
  }
  .prose > *:last-child {
    margin-bottom: 0;
  }

  /* Table styles to match VTextEditor */
  .prose table {
    @apply w-full table-auto border-collapse border border-gray bg-transparent dark:border-darkmode-border;
  }

  .prose th {
    @apply bg-transparent p-8 font-bold;
  }

  .prose td {
    @apply border border-gray p-8 dark:border-darkmode-border;
  }

  .prose .tableWrapper {
    @apply overflow-x-auto;
  }
</style>
