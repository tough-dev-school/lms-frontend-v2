<template>
  <div v-bind="$attrs">
    <slot v-for="slot in Object.keys($slots)" :key="slot" :name="slot" />
  </div>
</template>
