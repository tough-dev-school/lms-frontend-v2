<script lang="ts" setup>
  import dayjs from 'dayjs';
  import VFloat from '@/components/VFloat.vue';

  const props = defineProps({
    created: {
      type: String,
      required: true,
    },
    deleteTime: { type: Number, required: true },
    editTime: { type: Number, required: true },
  });

  const emit = defineEmits(['delete', 'edit']);

  export interface Action {
    eventName: string;
    label: string;
  }
  const checkIsAvailable = (timeout: number) => {
    return +dayjs() < +dayjs(props.created).add(timeout, 'minutes');
  };

  const actions: Action[] = [
    { eventName: 'delete', label: 'Удалить <sup><10 мин</sup>' },
    { eventName: 'edit', label: 'Редактировать <sup><30 мин</sup>' },
  ].filter((action) => {
    if (action.eventName === 'delete') {
      return checkIsAvailable(props.deleteTime);
    }
    if (action.eventName === 'edit') {
      return checkIsAvailable(props.editTime);
    }
  });
</script>

<template>
  <div class="flex gap-8">
    <button
      class="hidden text-gray transition-colors hover:text-black tablet:block"
      v-for="(action, index) in actions"
      :key="index"
      @click="emit(action.eventName)"
      v-html="action.label" />
    <VFloat
      class="block tablet:hidden"
      v-if="
        checkIsAvailable(props.deleteTime) || checkIsAvailable(props.editTime)
      ">
      <ul>
        <li class="text-base" v-for="(action, index) in actions" :key="index">
          <button
            class="h-32 w-full px-8 text-left text-gray transition-colors hover:text-black"
            :key="index"
            @click="emit(action.eventName)"
            v-html="action.label" />
        </li>
      </ul>
    </VFloat>
  </div>
</template>
