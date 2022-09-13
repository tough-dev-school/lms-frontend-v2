<template>
  <UiPopup ref="uiPopup">
    <template slot-scope="{ confirm, close }">
      <div class="feedback-popup__content">
        <AppHowToFeedbackText class="feedback-popup__text" />
        <ul class="feedback-popup__buttons">
          <li>
            <UiButton is-mobile-full-width size="big" color-type="primary" @click="confirm">Хорошо</UiButton>
          </li>
          <li>
            <UiButton is-mobile-full-width size="big" color-type="white" @click="close">Больше не показывать</UiButton>
          </li>
        </ul>
      </div>
    </template>
  </UiPopup>
</template>
<script>
import UiPopup from '@/components/ui-kit/UiPopup.vue';
import UiButton from '@/components/ui-kit/UiButton.vue';
import AppHowToFeedbackText from '@/components/AppHowToFeedbackText.vue';

export default {
  components: {
    UiPopup,
    UiButton,
    AppHowToFeedbackText,
  },
  methods: {
    async open() {
      return await this.$refs.uiPopup.open();
    },
  },
};
</script>
<style scoped>
.feedback-popup__content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 16px 32px 16px;
  overflow-y: auto;
}
.feedback-popup__text {
  margin-bottom: 32px;
}
.feedback-popup__buttons {
  margin-top: auto;
}

@media (--after-mobile) {
  .feedback-popup__buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
