<template>
  <span class="app-date">{{ humanReadable }}</span>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ru');

export default {
  props: {
    date: { type: [String, Object], required: true },
  },
  computed: {
    humanReadable() {
      return dayjs(this.date).fromNow();
    },
  },
};
</script>

<style lang="postcss" scoped>
.app-date {
  white-space: nowrap;
  @mixin robot-text-three;
  margin: 0;
  color: var(--superlight);
}
</style>
