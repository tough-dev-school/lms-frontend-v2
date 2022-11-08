<template>
  <div class="Preloader flex flex-col items-center">
    <div class="h-64 w-64 animate-pulse rounded-full bg-yellow"></div>
    <div class="mt-8 text-center">Загрузка</div>
  </div>
</template>

<style>
  .Preloader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
