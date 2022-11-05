<script lang="ts" setup>
  import { formatDate } from '@/utils/date';
  import dayjs from 'dayjs';

  const props = defineProps({
    dateAdded: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits(['delete', 'edit']);

  const DELETE_TIMEOUT_MINUTES = 10;
  const EDIT_TIMEOUT_MINUTES = 30;

  const format = (value: dayjs.ConfigType) => formatDate(value, 'HH:mm');

  const sentDate = dayjs(props.dateAdded);
  const deleteDeadlineDate = dayjs(props.dateAdded).add(
    DELETE_TIMEOUT_MINUTES,
    'minutes',
  );
  const editDeadlineDate = dayjs(props.dateAdded).add(
    EDIT_TIMEOUT_MINUTES,
    'minutes',
  );

  const checkIsAvailable = (timeout: number) => {
    return +dayjs() < +dayjs(sentDate).add(timeout, 'minutes');
  };

  const isDeleteAvailable = checkIsAvailable(DELETE_TIMEOUT_MINUTES);
  const isEditAvailable = checkIsAvailable(EDIT_TIMEOUT_MINUTES);
</script>

<template>
  <ul class="text-right text-sub">
    <li>Ответ был отправлен в {{ format(sentDate) }}</li>
    <li v-if="isDeleteAvailable">
      До {{ format(deleteDeadlineDate) }} его можно
      <button class="text-red underline" @click="emit('delete')">
        удалить
      </button>
    </li>
    <li v-if="isEditAvailable">
      До {{ format(editDeadlineDate) }} его можно
      <button class="text-blue underline" @click="emit('edit')">
        отредактировать
      </button>
    </li>
  </ul>
</template>
