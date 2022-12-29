<script lang="ts" setup>
  import dayjs from 'dayjs';
  import VFloat from '@/components/VFloat.vue';

  export interface Props {
    created: string;
    deleteTime: number;
    editTime: number;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'delete'): void;
    (e: 'edit'): void;
  }>();

  const checkIsAvailable = (timeout: number) => {
    return +dayjs() < +dayjs(props.created).add(timeout, 'minutes');
  };
</script>

<template>
  <div class="flex gap-8">
    <button
      class="hidden text-gray transition-colors hover:text-black tablet:block"
      v-if="checkIsAvailable(props.deleteTime)"
      @click="emit('delete')">
      Удалить <sup>{{ `<${deleteTime} мин` }}</sup>
    </button>
    <button
      class="hidden text-gray transition-colors hover:text-black tablet:block"
      v-if="checkIsAvailable(props.editTime)"
      @click="emit('edit')">
      Редактировать <sup>{{ `<${editTime} мин` }}</sup>
    </button>
    <VFloat
      class="block tablet:hidden"
      v-if="
        checkIsAvailable(props.deleteTime) || checkIsAvailable(props.editTime)
      ">
      <ul>
        <li class="text-base">
          <button
            class="link h-32 w-full px-8 text-left"
            v-if="checkIsAvailable(props.deleteTime)"
            @click="emit('delete')">
            Удалить <sup>{{ `<${deleteTime} мин` }}</sup>
          </button>
        </li>
        <li class="text-base">
          <button
            class="link h-32 w-full px-8 text-left"
            v-if="checkIsAvailable(props.editTime)"
            @click="emit('edit')">
            Редактировать <sup>{{ `<${editTime} мин` }}</sup>
          </button>
        </li>
      </ul>
    </VFloat>
  </div>
</template>
