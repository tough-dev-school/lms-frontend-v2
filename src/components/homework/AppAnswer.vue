<template>
  <div :id="answer.slug" class="answer" :class="{ 'answer--deleted': isDeleted }">
    <div class="answer__author-wapper">
      <AppUserAvatar v-if="!isChild" :user="answer.author" :color="currentColor" class="answer-editor__avatar" />
      <AppUserName :user="answer.author" :color="currentColor" class="answer__user-name" />
      <UiLink :to="answerUrl" class="answer__date-link">
        <AppDate :date="answer.created" class="answer__date" />
      </UiLink>
      <div v-if="isEditable" class="answer__edit">
        <AppIcon class="answer__edit-button" scale="0.8" name="edit" @click.prevent="isEditing = !isEditing" />
        <AppIcon class="answer__delete-button" scale="0.8" name="trash-alt" @click.prevent="deleted" />
      </div>
    </div>
    <div v-if="!isEditing" class="answer__text">
      <AppContent :html="answer.text" />
    </div>
    <div v-else class="answer__editor">
      <AppAnswerEditor
        submit-button-caption="Сохранить"
        :initial-answer="answer"
        :question="question"
        @cancel="isEditing = false"
        @submit="updateAnswer"
      />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

import { mapActions, mapState } from "vuex";

import AppAnswerEditor from "@/components/homework/AppAnswerEditor.vue";
import AppContent from "@/components/AppContent.vue";
import AppDate from "@/components/AppDate.vue";
import AppUserAvatar from "@/components/AppUserAvatar";
import AppUserName from "@/components/AppUserName";
import UiLink from "@/components/ui-kit/UiLink";

import "vue-awesome/icons/edit";
import "vue-awesome/icons/trash-alt";

export default {
  components: {
    AppAnswerEditor,
    AppContent,
    AppDate,
    AppUserAvatar,
    AppUserName,
    UiLink,
  },
  props: {
    answer: { type: Object, required: true },
    question: { type: Object, required: true },
    isChild: { type: Boolean, default: false },
  },
  data() {
    return {
      isDeleted: false,
      isEditing: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    isEditable() {
      let { created, modified } = this.answer;

      created = modified ? modified : created;

      return this.belongsToCurrentUser && dayjs(created).isAfter(dayjs().subtract(30, "minute"));
    },
    belongsToCurrentUser() {
      return this.user.uuid === this.answer.author.uuid;
    },
    currentColor() {
      return this.belongsToCurrentUser ? "secondary" : "primary";
    },
    answerUrl() {
      return {
        name: "Single answer",
        params: { id: this.answer.slug },
      };
    },
  },
  methods: {
    ...mapActions("answer", ["DELETE_ANSWER", "UPDATE_ANSWER"]),
    async deleted() {
      if (!confirm("Удаляем?")) {
        return;
      }
      const { answer } = this;
      await this.DELETE_ANSWER(answer);
      this.isDeleted = true;
      this.$emit("deleted", answer);
    },
    async updateAnswer(answer) {
      await this.UPDATE_ANSWER(answer);
      this.isEditing = false;
      this.$emit("updated");
    },
  },
};
</script>
<style lang="postcss" scoped>
.answer {
  &--deleted {
    opacity: 0.5;
    pointer-events: none;
  }
  &__author-wapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 8px;
  }
  &__user-name {
    margin-right: 0.6rem;
    font-weight: bold;
  }
  &__date-link {
    margin-right: 0.2rem;
  }
  &__date {
    &:hover {
      color: var(--link-hover);
    }
  }
  &__edit-button,
  &__delete-button {
    cursor: pointer;
    opacity: 0.4;
    margin-left: 0.5rem;
    position: relative;
    top: 0.05rem;
    &:hover {
      opacity: 0.6;
      fill: var(--link-hover);
    }
  }
  &__delete-button {
    position: relative;
    top: 0.1rem;
  }
}
</style>
