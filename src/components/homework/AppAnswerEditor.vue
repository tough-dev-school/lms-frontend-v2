<template>
  <form class="answer-editor" @submit.prevent="submit">
    <div v-if="isShowUserInfo" class="answer-editor__author-wapper">
      <AppUserAvatar :user="user" color="secondary" class="answer-editor__avatar" />
      <AppUserName :user="user" color="secondary" font="inter" />
    </div>
    <AppEditor ref="editor" v-model="text" :disabled="disabled" :save-data-to="userInputLocator" :initial="text" @submit="submit" />
    <ul class="answer-editor__button-list">
      <li>
        <UiButton
          :disabled="submitButtonDisabled"
          :is-mobile-full-width="onlySendButton"
          size="small"
          color-type="primary"
          class="login-form__button-enter"
        >
          {{ submitButtonCaption }}
        </UiButton>
      </li>
      <li v-if="!onlySendButton">
        <UiButton
          :disabled="disabled"
          type="button"
          size="small"
          color-type="white"
          class="login-form__button-enter"
          @click="$emit('cancel')"
        >
          {{ cancelButtonCaption }}
        </UiButton>
      </li>
    </ul>
  </form>
</template>

<script>
import { mapState } from "vuex";

import AppEditor from "@/components/AppEditor.vue";
import UiButton from "@/components/ui-kit/UiButton.vue";
import AppUserAvatar from "@/components/AppUserAvatar";
import AppUserName from "@/components/AppUserName";

import objectOrNullValidator from "@/utils/objectOrNullValidator.js";

export default {
  components: {
    AppEditor,
    UiButton,
    AppUserAvatar,
    AppUserName,
  },
  props: {
    disabled: { type: Boolean, default: false },
    onlySendButton: { type: Boolean, default: false },
    isShowUserInfo: { type: Boolean, default: false },
    submitButtonCaption: { type: String, default: "Отправить" },
    cancelButtonCaption: { type: String, default: "Отменить" },
    parent: {
      required: false,
      default: null,
      validator: objectOrNullValidator,
    },
    question: {
      required: false,
      default: null,
      validator: objectOrNullValidator,
    },
    initialAnswer: {
      required: false,
      default: null,
      validator: objectOrNullValidator,
    },
  },
  data() {
    return {
      text: this.initialAnswer ? this.initialAnswer.src : null,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("answer", ["answerWaitingForAPI"]),
    userInputLocator() {
      return `answer-${this.question.slug}-${this.parent?.slug}-${this.initialAnswer?.slug}`;
    },
    submitButtonDisabled() {
      return this.isWaitingForAPI || this.disabled || !this.text || this.text == this.initialAnswer?.src;
    },
    newAnswer() {
      return {
        text: this.text,
        parent: this.parent?.slug || null,
        slug: this.initialAnswer?.slug || null,
      };
    },
    isWaitingForAPI() {
      if (!this.initialAnswer || !this.answerWaitingForAPI) {
        return false;
      }
      return this.initialAnswer.slug == this.answerWaitingForAPI.slug;
    },
  },
  methods: {
    async submit() {
      this.$emit("submit", this.newAnswer);
    },
    focus() {
      this.$refs.editor.focus();
    },
    clear() {
      this.$refs.editor.clear();
    },
  },
};
</script>

<style lang="postcss" scoped>
.answer-editor {
  &__author-wapper {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &__avatar {
    margin-right: 8px;
  }

  &__button-list {
    display: flex;
    padding-top: 16px;

    li {
      width: 100%;
    }
  }
}

@media (--after-mobile) {
  .answer-editor__button-list {
    li {
      width: initial;
    }

    li:not(:last-child) {
      margin-right: 12px;
    }
  }
}
</style>
