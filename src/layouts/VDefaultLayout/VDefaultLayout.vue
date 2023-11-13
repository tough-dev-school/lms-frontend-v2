<script lang="ts" setup>
  // #TODO Remove test message when new-notion is merged

  import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
  import VPreloader from '@/components/VPreloader/VPreloader.vue';
  import VToastFeed from '@/components/VToastFeed/VToastFeed.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import useLoading from '@/stores/loading';

  const route = useRoute();
  const loading = useLoading();

  const hasHeader = computed(() => {
    return !route.meta.isPublic;
  });

  const isNotionTest = computed(() =>
    window.location.host.includes('new-notion'),
  );
</script>

<template>
  <main v-if="!loading.isLoading" class="container pb-128">
    <p
      v-if="isNotionTest"
      class="p-8 px-16 bg-lightgray text-black rounded mt-16">
      Это тестовая ветка с новым рендером ноушена. О багах писать
      <a
        class="link"
        href="https://3.basecamp.com/5104612/buckets/29069198/todolists/6338720082"
        >сюда</a
      >.
    </p>
    <header v-if="hasHeader" class="flex justify-end pt-16 pb-24 tablet:pb-64">
      <VProfileMenu class="w-full tablet:w-auto" />
    </header>
    <slot />
  </main>
  <VPreloader v-else />
  <VToastFeed />
</template>
