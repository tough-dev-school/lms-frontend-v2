<template>
  <a v-if="isDeletable" href="#" class="app-answer-delete-button" @click.prevent="del">
    <AppIcon class="app-answer-delete-button__icon" scale="0.8" name="trash-alt" />
  </a>
</template>
<script>
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import 'vue-awesome/icons/trash-alt';

export default {
  props: {
    answer: { type: Object, required: true },
    title: { type: String, required: false, default: 'удалить' },
  },
  computed: {
    ...mapState('auth', ['user']),
    isDeletable() {
      return this.authorMatches && this.createdNotTooLongAgo;
    },
    authorMatches() {
      return this.answer.author.uuid == this.user.uuid;
    },
    createdNotTooLongAgo() {
      const created = dayjs(this.answer.created);
      return created.isAfter(dayjs().subtract(30, 'minute'));
    },
  },
  methods: {
    async del() {
      if (!confirm('Удаляем?')) {
        return;
      }
      this.$emit('deleted', this.answer);
    },
  },
};
</script>
<style lang="postcss" scoped>
.app-answer-delete-button {
  &__icon {
    opacity: 0.4;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
