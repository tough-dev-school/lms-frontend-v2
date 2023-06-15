<script lang="ts" setup>
  import dayjs from 'dayjs';
  import { computed } from 'vue';
  import VAnswerActionsDesktop from '@/components/VAnswerActionsDesktop.vue';
  import VAnswerActionsMobile from '@/components/VAnswerActionsMobile.vue';

  export interface Props {
    created: string;
    deleteTime: number;
    editTime: number;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    delete: [];
    edit: [];
  }>();

  const checkIsAvailable = (timeout: number) => {
    return +dayjs() < +dayjs(props.created).add(timeout, 'minutes');
  };

  const allowDelete = computed(() => checkIsAvailable(props.deleteTime));
  const allowEdit = computed(() => checkIsAvailable(props.editTime));
</script>

<template>
  <div class="flex gap-8">
    <VAnswerActionsDesktop
      class="hidden tablet:flex"
      :deleteTime="deleteTime"
      :editTime="editTime"
      :allowDelete="allowDelete"
      :allowEdit="allowEdit"
      data-testid="desktop"
      @edit="emit('edit')"
      @delete="emit('delete')" />
    <VAnswerActionsMobile
      class="tablet:hidden"
      :deleteTime="deleteTime"
      :editTime="editTime"
      :allowDelete="allowDelete"
      :allowEdit="allowEdit"
      data-testid="mobile"
      @edit="emit('edit')"
      @delete="emit('delete')" />
  </div>
</template>
