<template>
  <div v-if="answer.descendants.length" class="answer-discussion">
    <h2 class="answer-discussion__title">{{ title }}</h2>
    <AnswerList :answers="answer.descendants" :question="question" v-on="$listeners" />
    <div ref="bottom"></div>
  </div>
</template>

<script>
import AnswerList from "@/components/homework/AnswerList.vue";

export default {
  components: { AnswerList },

  props: {
    answer: { type: Object, required: true },
    question: { type: Object, required: true },
  },

  computed: {
    title() {
      return this.answer.descendants.length > 1 ? "Обсуждение" : "Ваш ответ";
    },
  },
  methods: {
    scrollToBottom() {
      this.$scrollTo(this.$refs.bottom);
    },
  },
};
</script>
<style lang="postcss" scoped>
.answer-discussion__title {
  @mixin inter-title-two;
}
</style>
