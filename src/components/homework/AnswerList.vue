<template>
  <ul class="answer-list">
    <li v-for="answer in answers" :key="answer.slug" class="answer-list__item">
      <AppAnswer :answer="answer" :question="question" v-on="$listeners" />
      <AnswerList
        v-if="answer.descendants"
        :answers="answer.descendants"
        :question="question"
        class="single-answer__children"
        v-on="$listeners"
      />
    </li>
  </ul>
</template>
<script>
import AppAnswer from "@/components/homework/AppAnswer.vue";

export default {
  components: {
    AppAnswer,
    AnswerList: () => import("@/components/homework/AnswerList.vue"),
  },
  props: {
    answers: { type: Array, required: true },
    question: { type: Object, required: true },
  },
};
</script>
<style lang="postcss" scoped>
.answer-list {
  display: flex;
  flex-direction: column;

  &__item {
    margin-bottom: 32px;
  }
}
</style>
