<script lang="ts" setup>
  import dayjs from 'dayjs';

  const props = defineProps({
    created: {
      type: String,
      required: true,
    },
    deleteTime: { type: Number, required: true },
    editTime: { type: Number, required: true },
  });

  const emit = defineEmits(['delete', 'edit']);

  const checkIsAvailable = (timeout: number) => {
    return +dayjs() < +dayjs(props.created).add(timeout, 'minutes');
  };

  const isDeleteAvailable = checkIsAvailable(props.deleteTime);
  const isEditAvailable = checkIsAvailable(props.editTime);
</script>

<template>
  <div class="flex gap-8">
    <button
      class="text-gray hover:text-red"
      @click="emit('delete')"
      v-if="isDeleteAvailable">
      Удалить <sup>{{ '<10 мин' }}</sup>
    </button>
    <button
      v-if="isEditAvailable"
      class="text-gray hover:text-blue"
      @click="emit('edit')">
      Редактировать <sup>{{ '<30 мин' }}</sup>
    </button>
  </div>
</template>
