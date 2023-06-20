<script lang="ts" setup>
  import { faker } from '@faker-js/faker';
  import { ref } from 'vue';
  import { VAvatar } from '@/components/VAvatar';

  const options = [...Array(10)].map(() => faker.internet.emoji());
  const reactions = [...Array(10)].map(() => {
    {
      return {
        emoji: faker.internet.emoji(),
        authors: [...Array(faker.datatype.number({ min: 1, max: 3 }))].map(
          () => {
            return {
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              uuid: faker.datatype.uuid(),
            };
          },
        ),
      };
    }
  });

  const isOpen = ref(false);

  const handleOpen = () => (isOpen.value = true);
  const handleClose = () => (isOpen.value = false);
</script>

<template>
  <div class="flex flex-wrap gap-16 text-h2">
    <div class="inline-flex gap-16 rounded bg-offwhite">
      <button
        class="flex h-56 w-56 items-center justify-center rounded bg-offwhite p-8 grayscale hover:bg-lightgray"
        v-if="!isOpen"
        @click="handleOpen">
        😀
      </button>
      <button
        class="h-56 w-56 cursor-pointer rounded bg-offwhite p-8 hover:bg-lightgray"
        v-for="(reaction, index) in options"
        :key="index"
        @click="handleClose"
        v-else>
        {{ reaction }}
      </button>
    </div>
    <div
      class="flex cursor-pointer gap-16 rounded bg-offwhite p-8 hover:bg-lightgray"
      v-for="(reaction, index) in reactions"
      :key="index">
      <div class="flex h-40 w-40 items-center justify-center">
        {{ reaction.emoji }}
      </div>
      <div class="flex items-center pr-16">
        <abbr
          class="relative -mr-[16px] transition-all hover:z-50 hover:scale-150"
          v-for="author in reaction.authors"
          :key="author.uuid"
          :title="`${author.firstName} ${author.lastName}`">
          <VAvatar :userId="author.uuid" />
        </abbr>
      </div>
    </div>
  </div>
</template>
