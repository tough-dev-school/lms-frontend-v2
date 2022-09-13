<template>
  <AppContainer>
    <div v-if="isLoaded && !error" class="question">
      <h1 class="question__title">Домашняя работа: {{ question.name }}</h1>
      <AppContent :html="question.text" />
      <div v-if="answers.length" class="question__divider" />
      <div v-if="answers.length" class="question__answer-list">
        <h2 class="question__subtitle">{{ answersTitle }}</h2>
        <AnswerList :question="question" :answers="answers" @deleted="fetchAnswers" @updated="fetchAnswers" />
      </div>
      <QuestionPostAnswer :question="question" only-send-button @submitted="fetchAnswers" />
    </div>

    <h2 v-else-if="error" class="question__subtitle">Упс, что-то пошло не так <AppHTTPError :exception="error" /></h2>
  </AppContainer>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

import AppContent from "@/components/AppContent.vue";
import AppHTTPError from "@/components/AppHTTPError.vue";
import AppContainer from "@/components/AppContainer.vue";
import AnswerList from "@/components/homework/AnswerList.vue";
import QuestionPostAnswer from "@/components/Question/QuestionPostAnswer.vue";

export default {
  components: {
    AppContainer,
    AppContent,
    AppHTTPError,
    AnswerList,
    QuestionPostAnswer,
  },
  data() {
    return {
      isLoaded: false,
      error: null,
    };
  },
  computed: {
    ...mapState("question", ["question", "answers"]),
    ...mapState("auth", ["user"]),
    ...mapGetters("question", ["getAnswers", "filterAnswers"]),
    answersTitle() {
      return this.answers.length == 1 ? "Ваш ответ" : "Ответы";
    },
    particularAnswerId() {
      // slug of the requested answer
      const { hash } = this.$route;
      return hash ? hash.split("#")[1] : null;
    },
    particularAnswerIsLoaded() {
      const { particularAnswerId } = this;
      return particularAnswerId && this.filterAnswers({ slug: particularAnswerId }).length == 1;
    },
    questionId() {
      return this.$route.params.id;
    },
  },

  async created() {
    this.error = null;
    try {
      await Promise.all([this.FETCH_QUESTION({ id: this.questionId }), this.fetchAnswers()]);
      this.scrollToLoadedAnswer();
    } catch (e) {
      this.error = e;
    }
    this.isLoaded = true;
  },
  methods: {
    ...mapActions("question", ["FETCH_QUESTION", "FETCH_ANSWERS", "FETCH_PARTICULAR_ANSWER"]),
    async fetchAnswers() {
      return this.FETCH_ANSWERS({ question: this.questionId, author: this.user.uuid });
    },
    async scrollToLoadedAnswer() {
      if (this.particularAnswerId) {
        if (!this.particularAnswerIsLoaded) {
          await this.FETCH_PARTICULAR_ANSWER({ answer: this.particularAnswerId });
        }
        await this.$nextTick();
        this.$scrollTo(document.getElementById(this.particularAnswerId));
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.question {
  width: 100%;
  max-width: 868px;
}
.question__title {
  @mixin inter-title-one;
  margin-bottom: 8px;
}
.question__subtitle {
  @mixin inter-title-two;
  margin-bottom: 24px;
}
.question__divider {
  width: 100%;
  height: 1px;
  margin-bottom: 40px;
  background: var(--lightest);
  opacity: 0.5;
}
</style>
