<template>
  <div v-bind="$attrs">
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </div>
</template>
