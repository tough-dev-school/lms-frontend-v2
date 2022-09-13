<template>
  <AppContainer class="answer">
    <template v-if="isLoaded && !error">
      <div class="answer__row">
        <div class="answer__column answer__column--content">
          <h1 class="answer__title">{{ question.name }}</h1>
          <div class="answer__user-row">
            <p>Ответ от</p>
            <AppUserName :user="answer.author" />
          </div>
          <AppCollapsible :title="title" @closed="handleClosed" @opened="handleOpened">
            <AppContent :html="question.text" />
          </AppCollapsible>
        </div>
        <div class="answer__column answer__column--feedback" />
      </div>
      <div class="answer__row">
        <div class="answer__column answer__column--content">
          <div class="answer__divider" />
          <AppAnswer ref="firstAnswer" :answer="answer" :question="question" class="answer__answer" />
          <AppAnswerEditor
            ref="editor"
            :parent="answer"
            :question="question"
            :disabled="isLoading"
            only-send-button
            is-show-user-info
            class="answer__answer-editor"
            @submit="submit" />
          <AnswerDiscussion ref="discussion" :answer="answer" :question="question" @deleted="DELETE_ANSWER" />
        </div>
        <div class="answer__column answer__column--feedback">
          <div class="answer__feedback-text">
            <AppHowToFeedbackText />
          </div>
        </div>
      </div>
      <PopupFeedbackDescr />
    </template>

    <h2 v-else-if="error" class="answer__error">Упс, что-то пошло не так <AppHTTPError :exception="error" /></h2>
  </AppContainer>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import AppContent from '@/components/AppContent.vue';
import AppHTTPError from '@/components/AppHTTPError.vue';
import AppCollapsible from '@/components/AppCollapsible.vue';
import AppUserName from '@/components/AppUserName.vue';
import AppAnswer from '@/components/homework/AppAnswer.vue';
import AppAnswerEditor from '@/components/homework/AppAnswerEditor.vue';
import AnswerDiscussion from '@/components/Answer/AnswerDiscussion.vue';
import AppContainer from '@/components/AppContainer.vue';
import PopupFeedbackDescr from '@/components/popup/PopupFeedbackDescr.vue';
import AppHowToFeedbackText from '@/components/AppHowToFeedbackText.vue';

const COLLAPSE_BUTTON_TITLE = {
  readTask: 'Почитать задание',
  hide: 'Скрыть',
};

export default {
  components: {
    AppHowToFeedbackText,
    AppContent,
    AppCollapsible,
    AppHTTPError,
    AppAnswer,
    AppAnswerEditor,
    AppUserName,
    AnswerDiscussion,
    AppContainer,
    PopupFeedbackDescr,
  },
  data() {
    return {
      title: COLLAPSE_BUTTON_TITLE.readTask,
      isLoaded: false,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapState('answer', ['question', 'answer']),
    requestedAnswerId() {
      // slug of the requested answer
      const { hash } = this.$route;
      return hash ? hash.split('#')[1] : null;
    },
  },
  watch: {
    async isLoaded(isLoaded) {
      if (isLoaded && this.requestedAnswerId) {
        await this.$nextTick();
        this.scrollToAnswer(this.requestedAnswerId);
      }
    },
  },
  async mounted() {
    const { id } = this.$route.params;
    this.error = null;
    try {
      await this.FETCH_ANSWER({ id });
    } catch (e) {
      this.error = e;
    }
    this.isLoaded = true;
  },
  methods: {
    ...mapActions('answer', ['FETCH_ANSWER', 'POST_ANSWER']),
    ...mapMutations('answer', ['DELETE_ANSWER', 'UPDATE_ANSWER']),
    async submit({ text, parent }) {
      const answer = { text, parent, question: this.question.slug };
      this.isLoading = true;
      await this.POST_ANSWER(answer);
      this.isLoading = false;
      this.afterSubmit();
    },
    afterSubmit() {
      this.$refs.editor.clear();
      this.$refs.discussion.scrollToBottom();
    },
    async scrollToAnswer(answerId) {
      const element = document.getElementById(answerId);
      this.$scrollTo(element, 100);
      element.classList.add('answer--highlighted');
    },
    handleOpened() {
      this.title = COLLAPSE_BUTTON_TITLE.hide;
    },
    handleClosed() {
      this.title = COLLAPSE_BUTTON_TITLE.readTask;
    },
  },
};
</script>
<style lang="postcss" scoped>
.answer__row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}
.answer__column {
  display: flex;
  flex-direction: column;

  &--content {
    width: 100%;
  }
  &--feedback {
    display: none;
  }
}
.answer__title {
  @mixin inter-title-one;
  margin-bottom: 8px;
}
.answer__user-row {
  @mixin robot-text-two;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;

  p:first-child {
    margin: 0;
    margin-right: 0.3rem;
    line-height: 1;
  }
}
.answer__user-name {
  display: flex;
}
.answer__divider {
  width: 100%;
  height: 1px;
  margin-bottom: 40px;
  background: var(--lightest);
  opacity: 0.5;
}
.answer__answer {
  margin-bottom: 32px;
}
.answer__answer-editor {
  margin-bottom: 32px;
}
.answer__feedback-text {
  padding: 24px 16px 32px 16px;
  background-color: var(--feedback-bcg);
}
@media (--desktop) {
  .answer__column {
    &--content {
      width: 70%;
      max-width: 772px;
      margin-right: 32px;
    }
    &--feedback {
      display: flex;
      width: 30%;
      max-width: 340px;
      min-width: 250px;
    }
  }
}
</style>
