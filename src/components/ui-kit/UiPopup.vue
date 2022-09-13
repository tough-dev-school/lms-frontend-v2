<template>
  <div v-if="isOpen" class="popup-overlay" @click="handleClose">
    <section class="popup-overlay__content" @click.stop>
      <button class="popup-overlay__button-close" aria-label="закрыть" @click="handleClose" />
      <slot :close="handleClose" :confirm="handleConfirm" />
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return { isOpen: false };
  },

  currentPopupController: null,

  watch: {
    isOpen(newVal) {
      if (newVal) {
        document.addEventListener("keydown", this.handleEscClick);
        document.body.classList.add("popup-open");
      } else {
        document.removeEventListener("keydown", this.handleEscClick);
        document.body.classList.remove("popup-open");
      }
    },
  },

  methods: {
    open() {
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });

      this.$options.popupController = { resolve, reject };
      this.isOpen = true;

      return popupPromise;
    },
    handleConfirm() {
      this.$options.popupController.resolve(true);
      this.isOpen = false;
    },
    handleClose() {
      this.$options.popupController.resolve(false);
      this.isOpen = false;
    },
    handleEscClick(evt) {
      const ESC_KEY_CODE = 27;
      if (evt.keyCode === ESC_KEY_CODE) {
        this.handleClose();
      }
    },
  },
};
</script>
<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
}
.popup-overlay__content {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 101;
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 100vh;
  max-height: 95%;
  padding-top: 40px;
  background-color: var(--background);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  transform: translateX(-50%) translateY(-50%);
}
.popup-overlay__button-close {
  @mixin base-hover;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  background: transparent;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 9px;
    left: 1px;
    width: 18px;
    height: 2px;
    background-color: var(--basic);
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}

@media (--desktop) {
  .popup-overlay__content {
    height: initial;
    max-height: initial;
    width: initial;
  }
}
</style>
