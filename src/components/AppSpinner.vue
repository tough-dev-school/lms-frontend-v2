<template>
  <div class="spinner">
    <div class="spinner__circle" />
  </div>
</template>

<style lang="postcss" scoped>
.spinner {
  position: relative;
  height: 5rem;

  &__circle {
    position: absolute;
    left: 48%;
    border: 0.5rem solid #f3f3f3;
    border-top: 0.5rem solid #3498db;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    animation: spin 1s linear infinite;
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
